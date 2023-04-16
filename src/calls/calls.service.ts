import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CallDto } from './call.dto';
import { Call } from './calls.model';

@Injectable()
export class CallsService {
    constructor(
        @InjectModel(Call) private callRepository: typeof Call,
    ) {}

    async getAll() {
        return await this.callRepository.findAll();
    }

    async create(dto: CallDto) {
        return await this.callRepository.create(dto);
    }

    async delete(id: string) {
        try {
            const candidate = await this.callRepository.findByPk(id);
            await candidate.destroy();
            return {
                success: true,
            }
        } catch(e) {
            return {
                success: false,
            }
        }
    }
}
