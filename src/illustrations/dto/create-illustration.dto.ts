import { IsNumber } from "class-validator";

export class CreateIllustrationDto {
    @IsString({message: "Введите имя"})
    readonly name: string;

    @IsNumber()
    readonly photo: number;
}
