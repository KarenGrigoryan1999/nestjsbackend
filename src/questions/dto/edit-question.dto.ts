import { IsNumber, IsString, Length } from "class-validator";

export class EditQuestionDto {
  @IsNumber({}, { message: "Не передан id вопроса" })
  id: number;

  @Length(5, 100, { message: "Вопрос не может быть короче 5 символов" })
  readonly question;

  @IsString({ message: "Выберите тип вопроса" })
  readonly type;

  readonly answer_1;
  readonly answer_2;
  readonly answer_3;
  readonly answer_4;

  readonly photos: any[];

  @IsString({ message: "Введите верный ответ" })
  readonly correct_answer;

  readonly position;
}
