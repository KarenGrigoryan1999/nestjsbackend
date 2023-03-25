import { Module } from "@nestjs/common";
import { TestsController } from "./tests.controller";
import { TestsService } from "./tests.service";
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test } from "./tests.model";
import { Result } from "src/results/results.model";

@Module({
  controllers: [TestsController],
  providers: [TestsService],
  imports: [AuthModule, SequelizeModule.forFeature([Test, Result])],
})
export class TestsModule {}
