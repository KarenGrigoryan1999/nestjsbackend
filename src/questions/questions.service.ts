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

        return question;
    }
        
    async editQuestion(dto: EditQuestionDto) {
        const question = await this.questionsRepository.update(dto, { where: { id: dto.id }});

        return {
            success: true
        };
    }
}
