import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AuthModule } from './../auth/auth.module';
import { Illustrations } from './illustrations.model';
import { IllustrationsService } from './illustrations.service';
import { IllustrationsController } from './illustrations.controller';
import { IllustrationsPhotos } from 'src/files/types/illustrations-files.model';

@Module({
  controllers: [IllustrationsController],
  providers: [IllustrationsService],
  imports: [AuthModule, SequelizeModule.forFeature([Illustrations, IllustrationsPhotos])],
})
export class IllustrationsModule {}
