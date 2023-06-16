import { LessonsUsers } from './lessons-users.model';
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Course} from "src/courses/courses.model";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {UpdateLessonDto} from "./dto/update-lesson.dto";
import {Lesson} from "./lessons.model";
import {UserCourses} from "../users/user-courses.model";
import {CoursesLessons} from "../courses/courses-lessons.model";
import {Question} from "../questions/question.model";
import {File} from "../files/files.model";
import {CompletedLesson} from "../completed-lessons/completed-lessons.model";
import { User } from 'src/users/users.model';
import { inspect } from 'util';

@Injectable()
export class LessonsService {
    constructor(
        @InjectModel(Lesson) private lessonsRepository: typeof Lesson,
        @InjectModel(Course) private courseRepository: typeof Course,
        @InjectModel(UserCourses) private userCoursesRepository: typeof UserCourses,
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(CoursesLessons) private coursesLessonsRepository: typeof CoursesLessons,
        @InjectModel(CompletedLesson) private completedLessonsRepository: typeof CompletedLesson
    ) {
    }

    async createLesson(dto: CreateLessonDto) {
        const lesson = await this.lessonsRepository.create(dto);

        if (lesson.id) {
            await lesson.$set("video", dto.video);
            await lesson.$set("question", dto.questionId);
            return lesson;
        }

        throw new HttpException("Не удалось создать урок", HttpStatus.FORBIDDEN);
    }

    async updateLesson(dto: UpdateLessonDto) {
        const lesson = await this.lessonsRepository.findByPk(dto.id, {
            include: Course
        });

        if(dto.free) {
            const courseId = lesson.courses[0].id;
            const lessonCourse = await this.courseRepository.findByPk(courseId, {
                include: Lesson
            });
            for(let i = 0; i < lessonCourse.lessons.length; i++) {
                await lessonCourse.lessons[i].update({
                    free: false,
                });
            }
        }

        if (lesson.id) {
            await lesson.update(dto);
            await lesson.$set("video", dto.video);
            await lesson.$set("question", dto.questionId);

            return lesson;
        }

        throw new HttpException("Не удалось создать урок", HttpStatus.FORBIDDEN);
    }

    async markAsPassed(id: string, userId: string) {
        const lesson = await this.lessonsRepository.findByPk(id, {
            include: [Course]
        });
        if(lesson.free) {
            const coursePrevLessons = await this.courseRepository.findByPk(lesson.courses[0].id, {
                include: [{
                    model: Lesson,
                    include: [{
                        model: User,
                        where: {
                            id: userId
                        }
                    }],
                    where: {
                        position: lesson.position - 1,
                    },
                }],
            });
            if(coursePrevLessons && ((coursePrevLessons.lessons || lesson.position - 1 <= 1) || (coursePrevLessons.lessons && coursePrevLessons.lessons[0].user && coursePrevLessons.lessons[0].user.length > 0))) {
                lesson.$set("user", userId);
            }
        } else {
            lesson.$set("user", userId);
        }
        const courseLessons = await this.courseRepository.findByPk(lesson.courses[0].id, {
            include: [{
                model: Lesson,
                where: {
                    position: lesson.position + 1,
                }
            }],
        });

        if(!courseLessons || courseLessons.lessons.length === 0) {
            return {
                message: 'Course was completed'
            }
        } else {
            return {
                nextLesson: courseLessons.lessons[0].id
            }
        }
    }

    async getAll() {
        return await this.lessonsRepository.findAll({include: {all: true}});
    }

    async getLessonCourseId(id: string) {
        const lesson = await this.lessonsRepository.findByPk(id, {
            include: [Course]
        });

        if(lesson) {
            return {
                courseId: lesson.courses[0].id,
            }
        }

        throw new HttpException("Lesson was not found", HttpStatus.NOT_FOUND);
    }

    async getOne(id: string, user: any) {
        const isAdmin = user.roles.find(r => r.value === "ADMIN");
        const userId = user.id;
        let accessDenied = true; // По умолчанию доступ к уроку закрыт
        let exclude = [];
        
        // Если админ, то убираем скрытие верного ответа
        if (isAdmin) {
            exclude = [];
        }
        
        // Ищем урок
        const lesson = await this.lessonsRepository.findByPk(id, {
            include: [{
                model: Question,
                attributes: {
                    exclude
                }
            },
                {
                    model: File
                }]
        });
        
        // Если урок не найден, прекращаем работу
        if (!lesson?.id) {
            throw new HttpException("Такой урок не найден", HttpStatus.NOT_FOUND);
        }

        // Если администратор - возвращаем урок без каких либо проверок
        if (isAdmin) {
            return lesson;
        }

        // Проверяем, какому курсу принадлежит урок
        const course = await this.coursesLessonsRepository.findOne({
            where: {
                lessonId: lesson.id
            }
        });

        // Если урок не привязан ни к одному курсу - прекращаем работу
        if (!course?.courseId) {
            throw new HttpException("Урок не привязан ни к одному из курсов", HttpStatus.NOT_FOUND);
        }

        // Смотрим - покупали ли юзер курс, к которому принадлежит урок
        const userCourse = await this.userCoursesRepository.findOne({
            where: {
                userId,
                courseId: course.courseId
            }
        });

        // Если курс не был куплен - прекращаем работу
        if (!userCourse?.id) {
            throw new HttpException("Вы не покупали данный курс", HttpStatus.FORBIDDEN);
        }

        // Если курс взят как пробный - то открываем доступ только для курса, помеченного как пробный
        console.log(lesson.free)
        if (!userCourse.pay && lesson.free) {
            return lesson;
        }

        // Если курс куплен, смотрим уже пройденные уроки
        if (userCourse.pay) {
            const test = await this.userRepository.findByPk( user.id,{
                include: [Lesson]
            });

            if (lesson.position > 1) {
                // Ищем id предыдущего урока
                const allCourseLessons = await this.coursesLessonsRepository.findAll({
                    where: {
                        courseId: course.courseId,
                    },
                });
                let pastLessonIsPassed = false;
                for(let pLesson of test.lessons) {
                    pastLessonIsPassed = !!allCourseLessons.find((courseLessonElement: CoursesLessons) => courseLessonElement.lessonId === pLesson.id);
                    if(pastLessonIsPassed) break;
                }

                if(!pastLessonIsPassed && !lesson.free) throw new HttpException("Вы не прошли предыдущий урок", HttpStatus.FORBIDDEN);
            }

            console.log('first payed lesson');
            return lesson;
        }

        throw new HttpException("Нет доступа", HttpStatus.PAYMENT_REQUIRED);
    }

    async deleteLesson(id: string) {
        return await this.lessonsRepository.destroy({where: {id}});
    }

    async getPassedLessons(userId) {
        const lessons = await this.lessonsRepository.findAll({
            include: [{
                model: User,
                where: {
                    id: userId
                }
            },{
                model: Course
            }],
        });

        return lessons;
    }
}
