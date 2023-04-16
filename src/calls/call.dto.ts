import { Length, IsNotEmpty } from "class-validator";

export class CallDto {

    @IsNotEmpty()
    userData: string;

    @IsNotEmpty()
    @Length(11, 15, {
        message: "Неверный формат номера телефона",
      })
    phone: string;
}