import { IsString, Length } from "class-validator";

export class CreateQuestionDto {
  @Length(5, 2000, { message: "Вопрос не может быть короче 5 и больше 2000 символов" })
  readonly question;

  @IsString({ message: "Выберите тип вопроса" })
  readonly type;

  readonly answer_1;
  readonly answer_2;
  readonly answer_3;
  readonly answer_4;
  readonly answer_5;

  readonly photos: any[];

  @Length(1, 2000, { message: "Введите верный ответ" })
  readonly correct_answer;

  readonly position;
}
