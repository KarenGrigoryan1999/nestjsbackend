import {Body, Request, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { LessonsService } from "./lessons.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller("lessons")
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  createLesson(@Body() dto: CreateLessonDto) {
    return this.lessonsService.createLesson(dto);
  }
  
  @Put()
  updateLesson(@Body() dto: UpdateLessonDto) {
    return this.lessonsService.updateLesson(dto);
  }
  
  @Get()
  getLessons() {
    return this.lessonsService.getAll();
  }
  
  @Roles("ADMIN", "STUDENT")
  @UseGuards(RolesGuard)
  @Get("/:id")
  getLesson(@Request() req, @Param('id') id: string) {
    return this.lessonsService.getOne(id, req.user);
  }

  @Delete("/:id")
  deleteLesson(@Param('id') id: string) {
    return this.lessonsService.deleteLesson(id);
  }
}
