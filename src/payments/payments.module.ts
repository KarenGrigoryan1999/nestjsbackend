import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './payments.model';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { Course } from 'src/courses/courses.model';
import { Promo } from 'src/promo/promo.model';
import { UserCourses } from 'src/users/user-courses.model';
import { StatisticModule } from 'src/statistic/statistic.module';
import { Cart } from 'src/cart/cart.model';

@Module({
    imports: [AuthModule, HttpModule, StatisticModule, SequelizeModule.forFeature([Payment, Course, Cart, Promo, UserCourses])],
    controllers: [PaymentsController],
    providers: [PaymentsService],
})
export class PaymentsModule {}
