import {IsNumber} from "class-validator";

export class GetTeacherDto {
    @IsNumber({}, {message: "Не передан id преподавателя"})
    readonly id: number;
}
