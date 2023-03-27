import {IsEmail, IsNumber, IsString} from "class-validator";

export class GiftRequestDto {
    @IsString({message: "Введите адресс"})
    readonly address;

    @IsEmail({}, { message: "Вы корректный email" })
    readonly mail;

    @IsNumber({}, { message: "Вы корректный номер телефона" })
    readonly phone;

    @IsString()
    readonly shopId;
}
