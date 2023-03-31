import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PromoDto } from './dto/promo.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PromoService } from './promo.service';

@Controller('api/promo')
export class PromoController {
    constructor(private promoService: PromoService) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
      return this.promoService.getAll();
    }

    @Get("/:id")
    getById(@Param('id') id: string) {
      return this.promoService.getById(id);
    }

    @Post("/check/:name")
    check(@Param('name') name: string) {
      return this.promoService.check(name);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() dto: PromoDto) {
        return await this.promoService.create(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put("/:id")
    async update(@Body() dto: PromoDto, @Param('id') id: string) {
        return await this.promoService.update(id, dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete("/:id")
    async delete(@Param('id') id: string) {
        return await this.promoService.delete(id);
    }
}
