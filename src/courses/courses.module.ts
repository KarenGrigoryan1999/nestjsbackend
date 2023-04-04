import { Module } from "@nestjs/common";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "../files/files.module";
import { Course } from "./courses.model";
import { LessonsUsers } from "src/lessons/lessons-users.model";
import { Lesson } from "src/lessons/lessons.model";
import { User } from "src/users/users.model";
import { Result } from "src/results/results.model";
import { Statistic } from "src/statistic/static.model";
import { UserCourses } from "src/users/user-courses.model";

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [AuthModule, SequelizeModule.forFeature([Course, LessonsUsers, Lesson, User, Result, Statistic, UserCourses]), FilesModule],
})
export class CoursesModule {}
