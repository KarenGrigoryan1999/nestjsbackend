import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PromoDto } from './dto/promo.dto';
import { Promo } from './promo.model';

@Injectable()
export class PromoService {
    constructor(@InjectModel(Promo) private promosRepository: typeof Promo) {}
    
    async getAll() {
        return await this.promosRepository.findAll();
    }

    async getById(id: string) {
        const promo = await this.promosRepository.findByPk(id);

        if(promo) return promo;

        throw new HttpException('Promo was not found', HttpStatus.NOT_FOUND);
    }

    async check(name: string) {
        const promo = await this.promosRepository.findOne({
            where: {
                name
            }
        });

        if(promo) return promo;

        throw new HttpException('Promo was not found', HttpStatus.NOT_FOUND);
    }

    async create(dto: PromoDto) {
        return await this.promosRepository.create(dto);
    }

    async update(id: string, dto: PromoDto) {
        const promo = await this.promosRepository.findByPk(id);

        if(promo) {
            return await promo.update(dto);
        }

        throw new HttpException('Promo was not found', HttpStatus.NOT_FOUND);
    }

    async delete(id: string) {
        const promo = await this.promosRepository.findByPk(id);

        if(promo) {
            await promo.destroy();
            return {
                id: promo.id,
                deleted: true,
            }
        };

        throw new HttpException('Promo was not found', HttpStatus.NOT_FOUND);
    }
}
