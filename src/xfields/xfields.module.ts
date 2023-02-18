import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { XFieldsController } from "./xfields.controller";
import { XFields } from "./xfields.model";
import { XFieldsService } from "./xfields.service";

@Module({
  controllers: [XFieldsController],
  providers: [XFieldsService],
  exports: [XFieldsService],
  imports: [SequelizeModule.forFeature([XFields]), AuthModule],
})
export class XFieldsModule {}
