import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Course } from "./courses.model";
import { CreateCourseDto } from "./dto/create-course.dto";
import { EditCourseDto } from "./dto/edit-course.dto";
import { FilesService } from "../files/files.service";
import { Teacher } from "src/teachers/teachers.model";

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course) private coursesRepository: typeof Course,
    private fileService: FilesService
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

  async getCourse(id) {
    const course = await this.coursesRepository.findByPk(id, {
      include: { all: true, nested: true },
    });

    await course.lessons.sort((a, b) => a.position - b.position);

    return course;
  }

  async createCourse(dto: CreateCourseDto) {
    const course = await this.coursesRepository.create(dto);

    await course.$set("teachers", dto.teachers);
    await course.$set("file", dto.file);
    await course.$set("photo", dto.photo);
    await course.$set("lessons", dto.lessons);
    await course.$set("tests", dto.tests);

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
    const candidate = await this.coursesRepository.destroy({ where: { id } });

    if (candidate)
      return {
        id: id,
        deleted: true,
      };

    throw new HttpException("Такой курс не найден", HttpStatus.NOT_FOUND);
  }
}
