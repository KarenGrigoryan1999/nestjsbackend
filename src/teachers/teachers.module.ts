import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import {Teacher} from "./teachers.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "../auth/auth.module";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [SequelizeModule.forFeature([Teacher]), AuthModule, FilesModule]
})
export class TeachersModule {}
