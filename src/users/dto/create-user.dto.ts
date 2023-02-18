import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsEmail( {}, {message: "Введите корректный email"})
    readonly email: string;

    @Length(2, 20, {message: "Имя должно быть от 2 до 20 символов"})
    readonly name: string;
    
    @Length(2, 20, {message: "Фамилия должна быть от 2 до 30 символов"})
    readonly lastName: string;

    @Length(8, 20, {message: "Пароль может содержать от 8 до 40 символов"})
    readonly password: string;
}
