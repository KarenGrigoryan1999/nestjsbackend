import { IsNumber, Length } from "class-validator";

export class UpdateTestDto {
  @IsNumber({}, { message: "Такой вопрос не найден" })
  readonly id: number;

  @Length(3, 100, {
    message: "Название теста должно быть от 3 до 100 символов",
  })
  readonly name;

  readonly questions: any[];
}
