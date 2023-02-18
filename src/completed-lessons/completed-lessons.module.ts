import { Module } from '@nestjs/common';
import { CompletedLessonsService } from './completed-lessons.service';
import {AuthModule} from "../auth/auth.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {CompletedLesson} from "./completed-lessons.model";

@Module({
  providers: [CompletedLessonsService],
  imports: [AuthModule, SequelizeModule.forFeature([CompletedLesson])],
})
export class CompletedLessonsModule {}
