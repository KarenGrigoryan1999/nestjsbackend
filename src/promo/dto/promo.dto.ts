import {IsNumber, IsString} from "class-validator";

export class PromoDto {
    @IsString({message: "Введите название промокода"})
    readonly name;

    @IsNumber({}, { message: "Вы не передали размер скидки" })
    readonly discount;

    @IsNumber({}, { message: "Вы не передали тип скидки" })
    readonly type;
}
