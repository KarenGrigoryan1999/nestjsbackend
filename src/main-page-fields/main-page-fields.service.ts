import { MainPageFieldsDto } from './dto/main-page-fields.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MainPageFields } from './main-page-fields.model';

@Injectable()
export class MainPageFieldsService {
    constructor(@InjectModel(MainPageFields) private mainPageFields: typeof MainPageFields) {
    }

    async getAll() {
        const fields = await this.mainPageFields.findAll();
        return fields;
    }

    async updateAll(dto: MainPageFieldsDto) {
        const infoFromTable = await this.mainPageFields.findOne();
        if(infoFromTable){
            return await infoFromTable.update({id: infoFromTable.id, ...dto});
        } else {
            return await this.mainPageFields.create(dto);
        }
    }
}
