import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { FilesModule } from "src/files/files.module";
import { ShopImages } from "./shop-images.model";
import { ShopController } from "./shop.controller";
import { Shop } from "./shop.model";
import { ShopService } from "./shop.service";

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Shop, ShopImages]),
    FilesModule,
  ],
})
export class ShopModule {}
