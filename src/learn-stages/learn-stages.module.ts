import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LearnStages } from './learn-stages.model';
import { LearnStagesController } from './learn-stages.controller';
import { LearnStagesService } from './learn-stages.service';
import { AuthModule } from 'src/auth/auth.module';
import { LearnStagesPhotos } from './learn-stages-photos.dto';

@Module({
    imports: [AuthModule, SequelizeModule.forFeature([LearnStages, LearnStagesPhotos])],
    controllers: [LearnStagesController],
    providers: [LearnStagesService],
})
export class LearnStagesModule {}
