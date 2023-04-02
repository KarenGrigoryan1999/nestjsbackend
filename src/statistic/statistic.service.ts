import { Injectable } from '@nestjs/common';
import { Op, Sequelize } from 'sequelize';
import { Course } from './../courses/courses.model';
import { Statistic } from 'src/statistic/static.model';
import { InjectModel } from '@nestjs/sequelize';
import { StatisticDto } from './dto/statistic.dto';

@Injectable()
export class StatisticService {
    constructor(@InjectModel(Statistic) private statisticRepository: typeof Statistic) {}
    
    async addStatistic(dto: StatisticDto) {
        if(dto.courseId === undefined) {
            console.log(22222222222222222222);
            const statistic = await this.statisticRepository.findByPk(1);
            await statistic.update({
                users: statistic.users + 1
            });

            return {
                updated: true
            }
        }
        console.log(111111111111111111111111111111);
        const statistic = await this.statisticRepository.findOne({
            include: [{
                model: Course,
                where: {
                    id: dto.courseId
                }
            }],
            where: {
                createdAt: {
                    [Op.lte]: Sequelize.literal("NOW() - (INTERVAL '1 DAY')")
                }
            }
        });
        if(!(statistic && statistic.id !== 1)){
            const newStatistic = await this.statisticRepository.create({
                users: 1,
                sales: 0
            });

            await newStatistic.$set('course', dto.courseId);
        }else{
            await statistic.update({
                users: statistic.users + 1
            });
        }

        return {
            updated: true
        }
    }

    async getStatistic() {
        const statistic = await this.statisticRepository.findAll({
            where: {
                createdAt: {
                    [Op.gte]: Sequelize.literal('NOW() - INTERVAL "30 DAY"'),
                  }
            },
            include: { all: true }
        });

        const totalStatistic = await this.statisticRepository.findByPk(1);

        return {
            totalUsers: totalStatistic,
            totalSales: 0,
            mounthStatistic: statistic.filter((element: Statistic) => element.id !== 1)
        };
    }
}
