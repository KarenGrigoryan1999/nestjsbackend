import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shop } from 'src/shop/shop.model';
import { User } from 'src/users/users.model';
import { GiftRequestDto } from './dto/gift-request.dto';
import { Gifts } from './gifts.model';

@Injectable()
export class GiftsService {
    constructor(
        @InjectModel(Gifts) private giftsRepository: typeof Gifts,
        @InjectModel(User) private usersRepository: typeof User,
        @InjectModel(Shop) private shopsRepository: typeof Shop
    ) {}

    async getAll() {
        return await this.giftsRepository.findAll({
            include: {
                all: true,
            }
        });
    }

    async sendGiftRequest(userId: string, dto: GiftRequestDto) {
        const user = await this.usersRepository.findByPk(userId);
        const shop = await this.shopsRepository.findByPk(dto.shopId);

        if(shop.price > user.balance) {
            throw new HttpException("Point is not enough", HttpStatus.FORBIDDEN);
        }

        await this.usersRepository.update({
            balance: user.balance - shop.price,
        },{
            where: {
                id: userId,
            }
        });

        const gift = await this.giftsRepository.create({
            address: dto.address,
            mail: dto.mail,
            phone: dto.phone
        });

        await gift.$set('shops', shop);

        return gift;
    }

    async deleteGift(id: string) {
        const gift = await this.giftsRepository.findByPk(id);

        if(!gift) {
            throw new HttpException("Gift was not found", HttpStatus.NOT_FOUND);
        }

        await gift.destroy();

        return {
            deleted: true,
        }
    }
}
