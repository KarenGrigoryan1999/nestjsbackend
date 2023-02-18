import { IsEmail } from "class-validator";

export class ResetPasswordDto {
  @IsEmail({}, { message: "Введите корректный email" })
  readonly email: string;
}
