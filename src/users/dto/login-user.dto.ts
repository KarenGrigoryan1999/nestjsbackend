import {IsEmail, Length} from "class-validator";
import { externalAuthMethods } from "src/external-auth/interfaces/external-auth-type.interface";

export class LoginUserDto {
    @IsEmail( {}, {message: "Введите корректный email"})
    readonly email: string;

    @Length(8, 20, {message: "Пароль может содержать от 8 до 40 символов"})
    readonly password: string;

    readonly type?: externalAuthMethods;
}
