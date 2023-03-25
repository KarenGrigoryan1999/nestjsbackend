import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { File } from "./files.model";
import { AuthModule } from "../auth/auth.module";
import { TeacherPhotos } from "./types/teacher-photos.model";
import { TeacherVideos } from "./types/teacher-videos.model";
import { CoursesFiles } from "./types/courses-files.model";
import { CoursesPhotos } from "./types/courses-photos.model";
import { LessonsVideos } from "./types/lessons-videos.model";
import { TeacherVideoPreview } from "./types/teacher-video-preview.model";
import { UserAvatars } from "./types/user-avatars.model";
import { QuestionPhotos } from './types/question-photos.model';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
  imports: [
    SequelizeModule.forFeature([
      File,
      TeacherPhotos,
      QuestionPhotos,
      TeacherVideos,
      CoursesFiles,
      CoursesPhotos,
      TeacherVideoPreview,
      UserAvatars
    ]),
    AuthModule,
  ],
})
export class FilesModule {}
