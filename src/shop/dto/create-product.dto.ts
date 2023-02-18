import { Length } from "class-validator";

export class CreateProductDto {
  @Length(1, 100, {
    message: "Название товара должно быть от 1 до 100 символов",
  })
  readonly name: string;
  readonly description: string;

  readonly images: any[];
}
