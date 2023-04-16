import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CallsController } from './calls.controller';
import { Call } from './calls.model';
import { CallsService } from './calls.service';

@Module({
  controllers: [CallsController],
  providers: [CallsService],
  imports: [AuthModule, SequelizeModule.forFeature([Call])],
})
export class CallsModule {}
