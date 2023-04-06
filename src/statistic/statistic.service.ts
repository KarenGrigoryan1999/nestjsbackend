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
            const statistic = await this.statisticRepository.findByPk(1);
            await statistic.update({
                users: statistic.users + 1
            });

            return {
                updated: true
            }
        }
        const statistic = await this.statisticRepository.findOne({
            include: [{
                model: Course,
                where: {
                    id: dto.courseId
                }
            }],
            order: [ [ 'createdAt', 'DESC' ]],
        });
        if(!(statistic && (Date.now() - (new Date(statistic.createdAt)).getTime() < 24*60*60) && statistic.id !== 1)) {
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
            console.log('------------------------------------------------------------');
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
                    [Op.gte]: Sequelize.literal('CURRENT_DATE - INTERVAL 30 DAY'),
                  }
            },
            order:  [ [ 'users', 'DESC' ]],
            include: { all: true }
        });

        const dayStatistic = await this.statisticRepository.findAll({
            where: {
                createdAt: {
                    [Op.gte]: Sequelize.literal('CURRENT_DATE - INTERVAL 1 DAY'),
                  }
            },
            order:  [ [ 'users', 'DESC' ]],
            include: { all: true }
        });

        const totalStatistic = await this.statisticRepository.findByPk(1);

        return {
            totalUsers: totalStatistic.users,
            totalSales: 0,
            dayStatistic,
            mounthStatistic: statistic.filter((element: Statistic) => element.id !== 1)
        };
    }
}
