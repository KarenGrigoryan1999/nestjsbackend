import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { TestsService } from "./tests.service";

@Controller("tests")
export class TestsController {
  constructor(private testsService: TestsService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getTests() {
    return this.testsService.getAll();
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/:id")
  getTest(@Param("id") id: string) {
    return this.testsService.getOneById(id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  createTest(@Body() test: CreateTestDto) {
    return this.testsService.createTest(test);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put()
  updateTest(@Body() test: UpdateTestDto) {
    return this.testsService.updateTest(test);
  }
}
