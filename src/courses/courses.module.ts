import { Module } from "@nestjs/common";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "../files/files.module";
import { Course } from "./courses.model";

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [AuthModule, SequelizeModule.forFeature([Course]), FilesModule],
})
export class CoursesModule {}
