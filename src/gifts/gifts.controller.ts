import { GiftsService } from './gifts.service';
import { Body, Controller, Get, Post, Request, UseGuards, Delete, Param } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GiftRequestDto } from './dto/gift-request.dto';

@Controller('api/gifts')
export class GiftsController {
    constructor(private giftsService: GiftsService) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    async getAll() {
        return this.giftsService.getAll();
    }

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Post()
    async sendGiftRequest(@Request() req, @Body() dto: GiftRequestDto) {
        return await this.giftsService.sendGiftRequest(req.user.id, dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async deleteGift(@Param('id') id: string) {
        return await this.giftsService.deleteGift(id);
    }
}
