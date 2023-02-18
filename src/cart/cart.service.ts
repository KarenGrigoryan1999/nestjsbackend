import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Cart} from "./cart.model";

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart) private cartRepository: typeof Cart) {
    }

    async addToCart(id: number, userId: number) {
        return await this.cartRepository.findOrCreate({
            where: {
                courseId: id,
                userId
            },
            defaults: {
                courseId: id,
                userId
            }
        });
    }

    async deleteFromCart(id: number, userId: number) {
        const candidate = await this.cartRepository.destroy({
            where: {
                courseId: id,
                userId
            }
        });

        if (candidate)
        return {
          id: Number(id),
          deleted: true,
        };
  
      throw new HttpException("Такой продукт не найден", HttpStatus.NOT_FOUND);
    }

    async getCart(userId: number) {
        return await this.cartRepository.findAll({where: {userId}})
    }
}
