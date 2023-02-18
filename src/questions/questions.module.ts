import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';

@Module({
  providers: [QuestionsService],
  controllers: [QuestionsController],
  imports: [AuthModule, SequelizeModule.forFeature([Question])],
})
export class QuestionsModule {}
