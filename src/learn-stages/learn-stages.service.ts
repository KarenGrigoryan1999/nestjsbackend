import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LearnStagesDto } from './dto/learn-stages.dto';
import { LearnStages } from './learn-stages.model';

@Injectable()
export class LearnStagesService {
    constructor(
        @InjectModel(LearnStages) private learnStagesRepository: typeof LearnStages,
    ) {
    }

    async getAll() {
        return await this.learnStagesRepository.findAll({include: {all: true}});
    }

    async getById(id) {
        return await this.learnStagesRepository.findByPk(id, {include: {all: true, nested: true}});
    }

    async createStage(dto: LearnStagesDto) {
        const learnStage = await this.learnStagesRepository.create(dto)

        if (learnStage.id) {
            await learnStage.$set("photos", [dto.photo]);
            return learnStage;
        }


        throw new HttpException("Не удалось создать этап", HttpStatus.FORBIDDEN);
    }

    async updateStage(id, dto: LearnStagesDto) {
        const learnStage = await this.learnStagesRepository.findByPk(id);
        console.log(learnStage);

        if (learnStage.id) {
            await learnStage.update(dto);
            await learnStage.$set("photos", [dto.photo]);

            return {
                success: true,
            };
        }

        throw new HttpException("Не удалось обновить этап", HttpStatus.FORBIDDEN);
    }

    async deleteStage(id: string) {
        const deletedStage = await this.learnStagesRepository.destroy({where: {id}});

        return {
            id: deletedStage,
            deleted: true,
        }
    }
}
