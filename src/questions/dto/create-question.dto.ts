import { IsString, Length } from "class-validator";

export class CreateQuestionDto {
  @Length(5, 100, { message: "Вопрос не может быть короче 5 символов" })
  readonly question;

  @IsString({ message: "Выберите тип вопроса" })
  readonly type;

  readonly answer_1;
  readonly answer_2;
  readonly answer_3;
  readonly answer_4;

  @Length(1, 100, { message: "Введите верный ответ" })
  readonly correct_answer;

  readonly position;
}
