import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Result } from './results.model';

@Injectable()
export class ResultsService {
    constructor(
        @InjectModel(Result) private resultRepository: typeof Result,
        @InjectModel(User) private userRepository: typeof User
    ) {}

    async getScore(id: string) {
        const user = await this.userRepository.findByPk(id);

        return {
            balance: user.balance
        };
    }
}
