import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExternalAuth } from './external-auth.model';

@Module({
    imports: [SequelizeModule.forFeature([ExternalAuth])]
})
export class ExternalAuthModule {}
