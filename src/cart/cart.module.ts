import {forwardRef, Module} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Cart } from "./cart.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [SequelizeModule.forFeature([Cart]), forwardRef(() => AuthModule)],
  exports: [CartService]
})
export class CartModule {}
