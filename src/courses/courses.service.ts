import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Statistic } from './../statistic/static.model';
import { UserCourses } from './../users/user-courses.model';
import { LearnStages } from './../learn-stages/learn-stages.model';
import { LessonsUsers } from './../lessons/lessons-users.model';
import { Course } from "./courses.model";
import { CreateCourseDto } from "./dto/create-course.dto";
import { EditCourseDto } from "./dto/edit-course.dto";
import { FilesService } from "../files/files.service";
import { Teacher } from "src/teachers/teachers.model";
import { Lesson } from "src/lessons/lessons.model";
import { CoursesLessons } from "./courses-lessons.model";
import { User } from "src/users/users.model";
import { Result } from "src/results/results.model";
import { Test } from "src/tests/tests.model";

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course) private coursesRepository: typeof Course,
    @InjectModel(Result) private resultsRepository: typeof Result,
    @InjectModel(Statistic) private statisticRepository: typeof Statistic,
    @InjectModel(UserCourses) private userCoursesRepository: typeof UserCourses,
  ) {}

  async getAllCourses() {
    return await this.coursesRepository.findAll({
      include: [
        {
          all: true,
        },
        {
          model: Teacher,
          include: [
            {
              all: true,
            },
          ],
        },
      ],
    });
  }

  async getCourse(id): Promise<any> {
    const course = await this.coursesRepository.findByPk(id, {
      include: [{all: true, nested: true},{
        model: Test,
        attributes: { exclude: ['correct_answer'] }
      }],
    });
    console.log(course);

    if(course){
      course.lessons.sort((a, b) => a.position - b.position);
      return course;
    }

    throw new HttpException('', HttpStatus.NOT_FOUND);
  }

  async getUserCourseInfo(id, user): Promise<any> {
    console.log(user.roles[0].value === 'ADMIN');
    const course = await this.getCourse(id);
    const courseToJson = course.get({plain: true});

    const userCourse = await this.userCoursesRepository.findOne({
      where: {
          userId: user.id,
          courseId: id
      },
  });
  if(!userCourse.pay && user.roles[0].value !== 'ADMIN') courseToJson.tests = [];

    const finishedLessons = await this.coursesRepository.findByPk(id, {
      include: [
        {
          model: Lesson,
          include: [
            {
              model: User,
              required: true,
              where: {
                id: user.id
              }
            }
          ],
        }
      ]
    });

    const results = await this.resultsRepository.findAll({
      include: [{
        model: User,
        where: {
          id: user.id
        }
      },
      ]
    });

    const filteredResults = results.reduce((res, element) => [...res, course.tests.reduce((acc, testElement) => testElement.id === element.testId ? true : acc, false) ? element : undefined], []).filter(element => element !== undefined);

    return {...courseToJson, results: filteredResults, finishedLessons: finishedLessons.lessons.map((element: Lesson) => element.id)};
  }

  async createCourse(dto: CreateCourseDto) {
    const course = await this.coursesRepository.create(dto);

    await course.$set("teachers", dto.teachers);
    await course.$set("file", dto.file);
    await course.$set("photo", dto.photo);
    await course.$set("lessons", dto.lessons);
    await course.$set("tests", dto.tests);

    const statistic = await this.statisticRepository.create({
      users: 0,
      sales: 0,
    });

    await statistic.$set('course', course);

    return course;
  }

  async editCourse(dto: EditCourseDto) {
    const editedCourse = await this.coursesRepository.findByPk(dto.id);

    if (editedCourse) {
      await this.coursesRepository.update(dto, {
        where: { id: dto.id },
      });

      await editedCourse.$set("teachers", dto.teachers);
      await editedCourse.$set("file", dto.file);
      await editedCourse.$set("photo", dto.photo);
      await editedCourse.$set("lessons", dto.lessons);
      await editedCourse.$set("tests", dto.tests);

      return {
        success: true,
      };
    }

    throw new HttpException("Такой курс не найден", HttpStatus.NOT_FOUND);
  }

  async deleteCourse(id: number) {
    const candidateStatistic = await this.statisticRepository.findOne({
      include: [
        {
          model: Course,
          where: {
            id
          }
        }
      ]
    });
    const candidate = await this.coursesRepository.destroy({ where: { id }});
    await candidateStatistic.destroy();

    if (candidate)
      return {
        id: id,
        deleted: true,
      };

    throw new HttpException("Такой курс не найден", HttpStatus.NOT_FOUND);
  }
}
