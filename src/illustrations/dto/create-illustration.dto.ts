import { IsString } from "class-validator";

export class CreateIllustrationDto {
    @IsString({message: "Введите имя"})
    readonly name: string;

    @IsString()
    readonly photo: number;
}
