import { IsNumber, IsString, Length } from "class-validator";

export class updateTeacherDto {
  readonly id: number;
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
  readonly video: any[];
  readonly photos: any[];
  readonly video_preview: any[];
}
