import {IsEmail, Length} from "class-validator";

export class VerifyResetPasswordDto {
    @IsEmail({}, {message: "Передан некорректный email"})
    email: string;
    
    @Length(32,  32, {message: "Передан не валидный код"})
    code: string;
}
