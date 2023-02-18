import { IsNumber, IsString, Length } from "class-validator";

export class CreateTestDto {
  @Length(3, 100, {
    message: "Название теста должно быть от 3 до 100 символов",
  })
  readonly name;

  readonly questions: number[];
}
