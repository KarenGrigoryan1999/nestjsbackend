import {
  IsEmpty,
  IsHexColor,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from "class-validator";

export class EditCourseDto {
  @IsNumber({}, { message: "Такой курс не найден" })
  readonly id: number;

  @MinLength(5, {
    message: `Название курса не может быть короче $constraint1 символов`,
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
  readonly teachers: any[];
  readonly file: any[];
  readonly photo: any[];
  readonly lessons: any[];
  readonly tests: any[];
}
