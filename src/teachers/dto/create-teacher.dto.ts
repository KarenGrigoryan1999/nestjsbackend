import { IsString, Length } from "class-validator";

export class createTeacherDto {
  @IsString({ message: "Введите имя" })
  @Length(3, 20, {
    message: "Имя не может быть короче 3 или длиннее 20 символов",
  })
  readonly name: string;
  readonly last_name: string;
  readonly patronymic: string;
  readonly text: string;
  readonly instagram: string;
  readonly experience: string;
  readonly illustration_type: string;
  readonly video: number[];
  readonly photos: number[];
  readonly video_preview: number[];
}
