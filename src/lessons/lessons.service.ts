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

@Injectable()
export class LessonsService {
    constructor(
        @InjectModel(Lesson) private lessonsRepository: typeof Lesson,
        @InjectModel(Course) private courseRepository: typeof Course,
        @InjectModel(UserCourses) private userCoursesRepository: typeof UserCourses,
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
        const lesson = await this.lessonsRepository.findByPk(dto.id);

        if (lesson.id) {
            await lesson.update(dto);
            await lesson.$set("video", dto.video);
            await lesson.$set("question", dto.questionId);

            return lesson;
        }

        throw new HttpException("Не удалось создать урок", HttpStatus.FORBIDDEN);
    }

    async getAll() {
        return await this.lessonsRepository.findAll({include: {all: true}});
    }

    async getOne(id: string, user: any) {
        const isAdmin = user.roles.find(r => r.value === "ADMIN");
        const userId = user.id;
        let accessDenied = true; // По умолчанию доступ к уроку закрыт
        let exclude = ["correct_answer"];

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
            throw new HttpException("Вы не покупали данный курс", HttpStatus.NOT_FOUND);
        }

        // Если курс взят как пробный - то открываем доступ только для первого урока
        if (!userCourse.pay && lesson.position === 1) {
            return lesson;
        }

        // Если курс куплен, смотрим уже пройденные уроки
        if (userCourse.pay) {
            const completedLessons = await this.completedLessonsRepository.findAll({
                where: {
                    courseId: course.courseId
                }
            });

            if (lesson.position > 1) {
                // Ищем id предыдущего урока
                const prevLessons = await this.lessonsRepository.findAll({
                    where: {
                        position: lesson.position - 1
                    }
                });
                const allCourseLessons = await this.coursesLessonsRepository.findAll({
                    where: {
                        courseId: course.courseId
                    }
                });

                prevLessons.forEach(pLesson => {
                    const some = allCourseLessons.find(l => l.lessonId === pLesson.id);
                    console.log(some?.id)
                    if (some?.id) {
                        return lesson;
                    }
                });

                throw new HttpException("Вы не прошли предыдущий урок", HttpStatus.NOT_FOUND);
            }

            console.log('first payed lesson');
            return lesson;
        }

        throw new HttpException("Нет доступа", HttpStatus.NOT_FOUND);
    }

    async deleteLesson(id: string) {
        return await this.lessonsRepository.destroy({where: {id}});
    }
}
