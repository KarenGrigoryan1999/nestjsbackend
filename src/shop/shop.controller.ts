import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ShopService } from "./shop.service";

@Controller("shop")
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.shopService.createProduct(dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put()
  updateProduct(@Body() dto: UpdateProductDto) {
    return this.shopService.updateProduct(dto);
  }

  @Get()
  getAllProducts() {
    return this.shopService.getAllProducts();
  }

  @Get("/:id")
  getProduct(@Param("id") id: string) {
    return this.shopService.getProduct(id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete("/:id")
  deleteProduct(@Param("id") id: string) {
    return this.shopService.deleteProduct(id);
  }
}
