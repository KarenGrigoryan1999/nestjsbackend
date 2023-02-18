import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { MainPageFieldsController } from './main-page-fields.controller';
import { MainPageFields } from './main-page-fields.model';
import { MainPageFieldsService } from './main-page-fields.service';

@Module({
  controllers: [MainPageFieldsController],
  providers: [MainPageFieldsService],
  imports: [AuthModule, SequelizeModule.forFeature([MainPageFields])]
})
export class MainPageFieldsModule {}
