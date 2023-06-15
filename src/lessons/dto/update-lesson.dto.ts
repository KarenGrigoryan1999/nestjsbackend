import {IsNumber, IsString} from "class-validator";

export class UpdateLessonDto {
    @IsNumber({}, { message: "Не передан id урока" })
    id: number;
        
    @IsString({message: "Введите название урока"})
    readonly name;

    @IsNumber({}, { message: "Вы не передали номер урока" })
    readonly position;

    @IsNumber({}, { message: "Вы не передали id видео" })
    readonly video;

    @IsNumber({}, { message: "Не переданы уроки" })
    readonly questionId: number;

    readonly free?: boolean;
}
