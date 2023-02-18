import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Shop } from "./shop.model";

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop) private shopRepository: typeof Shop) {}

  async createProduct(dto: CreateProductDto) {
    const product = await this.shopRepository.create(dto);
    await product.$set("images", dto.images);
    return product;
  }
  
  async updateProduct(dto: UpdateProductDto) {
    const editedProduct = await this.shopRepository.findByPk(dto.id);

    if (editedProduct) {
      await this.shopRepository.update(dto, {
        where: { id: dto.id },
      });

      await editedProduct.$set("images", dto.images);

      return {
        success: true,
      };
    }

    throw new HttpException("Такой курс не найден", HttpStatus.NOT_FOUND);
  }

  async getAllProducts() {
    return await this.shopRepository.findAll({ include: { all: true } });
  }

  async getProduct(id: string) {
    return await this.shopRepository.findByPk(Number(id), {
      include: { all: true },
    });
  }

  async deleteProduct(id: string) {
    const candidate = await this.shopRepository.destroy({
      where: { id: Number(id) },
    });

    if (candidate)
      return {
        id: Number(id),
        deleted: true,
      };

    throw new HttpException("Такой продукт не найден", HttpStatus.NOT_FOUND);
  }
}
