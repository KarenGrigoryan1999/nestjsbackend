import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { EditQuestionDto } from "./dto/edit-question.dto";
import { QuestionsService } from "./questions.service";

@Controller("api/questions")
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  createQuestion(@Body() dto: CreateQuestionDto) {
    return this.questionService.createQuestion(dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put()
  editQuestion(@Body() dto: EditQuestionDto) {
    return this.questionService.editQuestion(dto);
  }
}
