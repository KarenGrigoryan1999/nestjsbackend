import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './payments.model';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { Course } from 'src/courses/courses.model';

@Module({
    imports: [AuthModule, HttpModule, SequelizeModule.forFeature([Payment, Course])],
    controllers: [PaymentsController],
    providers: [PaymentsService],
})
export class PaymentsModule {}
