import {IsNumber, IsString} from "class-validator";

export class LearnStagesDto {
    @IsString({message: "Введите заголовок этапа"})
    readonly title;

    @IsNumber({}, { message: "Вы не передали тип смайла" })
    readonly smileType;

    readonly photo;
}
