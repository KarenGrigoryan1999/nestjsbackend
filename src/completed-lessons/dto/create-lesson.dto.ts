import {IsNumber, IsString} from "class-validator";

export class CreateLessonDto {
    @IsString({message: "Введите название урока"})
    readonly name;

    @IsNumber({}, { message: "Вы не передали номер урока" })
    readonly position;

    @IsNumber({}, { message: "Вы не передали id видео" })
    readonly video;

    @IsNumber({}, { message: "Не переданы уроки" })
    readonly  questionId: number;

    @IsString({ message: "Не передан id курса" })
    readonly  courseId: string;
}
