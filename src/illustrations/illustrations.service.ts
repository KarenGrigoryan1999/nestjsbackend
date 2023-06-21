import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { Illustrations } from './illustrations.model';
import { File } from "../files/files.model";

@Injectable()
export class IllustrationsService {
  constructor(
    @InjectModel(Illustrations) private illustrationsRepository: typeof Illustrations,
  ) {}

  async create(dto: CreateIllustrationDto) {
    const illustration = await this.illustrationsRepository.create({name: dto.name});
    await illustration.$set("photo", [dto.photo]);
    return illustration;
  }

  async findAll() {
    return await this.illustrationsRepository.findAll();
  }

  async findOne(id: number) {
    return await this.illustrationsRepository.findByPk(id, {
      include: [File]
    });
  }

  async update(id: number, dto: CreateIllustrationDto) {
    const illustration = await this.illustrationsRepository.findByPk(id);
    await illustration.update({name: dto.name});
    await illustration.$set("photo", [dto.photo]);
    return illustration;
  }

  async remove(id: number) {
    await this.illustrationsRepository.destroy({where: {id}});
    return {
      deleted: true,
    }
  }
}
