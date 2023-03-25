import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PromoController } from './promo.controller';
import { Promo } from './promo.model';
import { PromoService } from './promo.service';

@Module({
  controllers: [PromoController],
  providers: [PromoService],
  imports: [AuthModule, SequelizeModule.forFeature([Promo])]
})
export class PromoModule {}
