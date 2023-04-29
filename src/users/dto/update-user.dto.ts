import { IsEmail, Length } from "class-validator";

export class UpdateUserDto {
  @Length(1, 4, { message: "Не передан id юзера" })
  readonly id: number;

  @IsEmail({}, { message: "Введите корректный email" })
  readonly email: string;

  @Length(2, 20, { message: "Имя должно быть от 2 до 20 символов" })
  readonly name: string;

  @Length(2, 20, { message: "Фамилия должна быть от 2 до 30 символов" })
  readonly lastName: string;

  readonly phone?: string;
}
