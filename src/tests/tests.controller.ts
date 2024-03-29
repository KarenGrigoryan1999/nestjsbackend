import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CompleteTestDto } from "./dto/complete-test.dto";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { TestsService } from "./tests.service";

@Controller("api/tests")
export class TestsController {
  constructor(private testsService: TestsService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getTests() {
    return this.testsService.getAll();
  }

  @Roles("ADMIN", "STUDENT")
  @UseGuards(RolesGuard)
  @Get("/:id")
  getTest(@Param("id") id: string, @Request() req) {
    return this.testsService.getOneById(id, req.user.roles);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  createTest(@Body() test: CreateTestDto) {
    return this.testsService.createTest(test);
  }

  @Roles("ADMIN", "STUDENT")
  @UseGuards(RolesGuard)
  @Put("/save-result")
  completeTest(@Request() req, @Body() dto: CompleteTestDto) {
    return this.testsService.completeTest(dto, req.user.id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put()
  updateTest(@Body() test: UpdateTestDto) {
    return this.testsService.updateTest(test);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete("/:id")
  deleteTest(@Param("id") id: string) {
    return this.testsService.deleteTest(id);
  }

  @Put('/check')
  checkTest(@Body() test: any) {
    return this.testsService.checkTest(test);
  }
}
