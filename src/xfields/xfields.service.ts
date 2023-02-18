import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { XFields } from "./xfields.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class XFieldsService {
  constructor(
    @InjectModel(XFields) private XFieldsRepository: typeof XFields
  ) {}

  async saveXFields(XFields) {
    console.log(XFields);

    return await this.XFieldsRepository.update(XFields, {
      where: {
        code: XFields.code,
      },
    });
  }

  async getAll() {
    return await this.XFieldsRepository.findAll();
  }
}
