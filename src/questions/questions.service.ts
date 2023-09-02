import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionDto } from './dto/create-question.dto';
import { EditQuestionDto } from './dto/edit-question.dto';
import { Question } from './question.model';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel(Question) private questionsRepository: typeof Question) { }

    async createQuestion(dto: CreateQuestionDto) {
        const question = await this.questionsRepository.create(dto);

        await question.$set("photos", dto.photos);

        return question;
    }

    async editQuestion(dto: EditQuestionDto) {
        const question = await this.questionsRepository.findByPk(dto.id);

        await question.update(dto);

        await question.$set("photos", dto.photos);

        return {
            success: true
        };
    }

    async deleteQuestion(id) {
        const question = await this.questionsRepository.findByPk(id);
        if (question) {
            await question.destroy();

            return {
                deleted: true,
            }
        } else {
            throw new HttpException("Вопрос с таким id не найден", HttpStatus.NOT_FOUND);
        }
    }
}
