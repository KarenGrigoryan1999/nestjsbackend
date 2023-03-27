import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Gifts } from './gifts.model';
import { User } from 'src/users/users.model';
import { Shop } from './../shop/shop.model';

@Module({
  providers: [GiftsService],
  controllers: [GiftsController],
  imports: [AuthModule, SequelizeModule.forFeature([Gifts, User, Shop])]
})
export class GiftsModule {}
