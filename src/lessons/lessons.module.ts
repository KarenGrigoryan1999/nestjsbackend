import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import {AuthModule} from "../auth/auth.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Lesson} from "./lessons.model";
import { Course } from 'src/courses/courses.model';
import {UserCourses} from "../users/user-courses.model";
import {CoursesLessons} from "../courses/courses-lessons.model";
import {CompletedLesson} from "../completed-lessons/completed-lessons.model";

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [AuthModule, SequelizeModule.forFeature([Lesson, Course, UserCourses, CoursesLessons, CompletedLesson])],
})
export class LessonsModule {}
