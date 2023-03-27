import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './../users/users.model';
import { Result } from './results.model';
import { UserResults } from './user-results.model';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule, SequelizeModule.forFeature([Result, UserResults, User])],
    controllers: [ResultsController],
    providers: [ResultsService]
})
export class ResultsModule {}
