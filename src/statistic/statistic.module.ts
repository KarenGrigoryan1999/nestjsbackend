import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Statistic } from './static.model';
import { AuthModule } from 'src/auth/auth.module';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
  imports: [AuthModule,
    SequelizeModule.forFeature([Statistic]),]
})
export class StatisticModule {}
