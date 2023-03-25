import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Result } from './results.model';

@Injectable()
export class ResultsService {
    constructor(@InjectModel(Result) private resultRepository: typeof Result) {}

    async getScore(id: string) {
        const results = await this.resultRepository.findAll({
            include: [
                {
                    model: User,
                    where: {
                        id
                    }
                }
            ]
        });

        return results.reduce((res, resultElement: Result) => resultElement.result + res, 0);
    }
}
