import { Length } from "class-validator";

export class CreateCourseDto {
  @Length(1, 100, {
    message: "Название курса должно быть от 1 до 100 символов",
  })
  readonly name: string;
  readonly slang_name: string;
  readonly slang_name_alternative: string;
  readonly cabinet: string;
  readonly color: string;
  readonly description: string;
  readonly theme: string;
  readonly question_1: string;
  readonly question_2: string;
  readonly question_3: string;
  readonly answer_1: string;
  readonly answer_2: string;
  readonly answer_3: string;
  readonly price: number;
  readonly sale_price: number;
  readonly teachers: number[];
  readonly file: number[];
  readonly photo: number[];
  readonly lessons: any[];
  readonly tests: any[];
}
