import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Teacher } from "./teachers.model";
import { createTeacherDto } from "./dto/create-teacher.dto";
import { GetTeacherDto } from "./dto/get-teacher.dto";
import { updateTeacherDto } from "./dto/update-teacher.dto";
import { FilesService } from "../files/files.service";

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher) private teachersRepository: typeof Teacher,
    private fileService: FilesService
  ) {}

  async createTeacher(dto: createTeacherDto) {
    const teacher = await this.teachersRepository.create(dto);

    await teacher.$set("photos", dto.photos);
    await teacher.$set("video", dto.video);
    await teacher.$set("video_preview", dto.video_preview);

    return teacher;
  }

  async updateTeacher(dto: updateTeacherDto) {
    const teacher = await this.teachersRepository.findByPk(dto.id);

    if (teacher) {
      if (dto.photos.length) {
        await teacher.$set("photos", dto.photos);
      }

      if (dto.video.length) {
        await teacher.$set("video", dto.video);
      }

      if (dto.video_preview.length) {
        await teacher.$set("video_preview", dto.video_preview);
      }

      await this.teachersRepository.update(dto, {
        where: { id: dto.id },
      });

      return {
        success: true,
      };
    }

    throw new HttpException(
      `Невозможно отредактировать преподавателя ${dto.id}`,
      HttpStatus.BAD_REQUEST
    );
  }

  async getAllTeachers() {
    return await this.teachersRepository.findAll({ include: { all: true } });
  }

  async getTeacherById(id: string) {
    const teacher = await this.teachersRepository.findOne({
      include: { all: true },
      where: { id: +id },
    });

    console.log(teacher);

    if (teacher) return teacher;

    throw new HttpException("Преподаватель не найден", HttpStatus.NOT_FOUND);
  }

  async deleteTeacherById(id: string) {
    const candidate = await this.teachersRepository.destroy({
      where: { id: +id },
    });
    if (candidate)
      return {
        id: +id,
        deleted: true,
      };

    throw new HttpException(
      "Такой преподаватель не найден",
      HttpStatus.NOT_FOUND
    );
  }
}
