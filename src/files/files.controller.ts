import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Response,
  Get,
  Param,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { diskStorage } from "multer";

@Controller("api/files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: "files", maxCount: 3 }], {limits: {fileSize: 500000000000}}))
  saveFile(
    @Body("catalog") catalog: string,
    @Body("private") isPrivate: string,
    @UploadedFiles()
    f: {
      files?: Express.Multer.File[];
    }
  ) {
    const isPrivateFile = JSON.parse(isPrivate);
    const file = f["files"][0];
    const fileData = file.originalname.split(".");
    const fileType = fileData[fileData.length - 1];

    if (isPrivateFile) {
      return this.filesService.uploadToS3(file.buffer, fileType);
    }

    return this.filesService.createFile(f, catalog, isPrivateFile);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('lesson')
  @UseInterceptors(FileFieldsInterceptor([{ name: "files", maxCount: 1 }], {dest: './', limits: {fileSize: 500000000000}}))
  saveLesson(
    @Body("catalog") catalog: string,
    @Body("private") isPrivate: string,
    @UploadedFiles()
    f: {
      files?: Express.Multer.File[];
    }
  ) {

    return this.filesService.createLessonFile(f.files[0].originalname, catalog);
  }

  @Get("/:video")
  async getVideo(
    @Response({ passthrough: true }) response,
    @Param("video") video: string
  ) {
    response.set({
      "Content-Type": `video/mp4`,
    });

    return this.filesService.getVideo(video);
  }
}
