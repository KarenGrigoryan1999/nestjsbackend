import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { MainPageFieldsService } from './main-page-fields.service';
import { MainPageFieldsDto } from './dto/main-page-fields.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('main-page-fields')
export class MainPageFieldsController {
    constructor(private mainPageFieldsService: MainPageFieldsService){}
    @Get()
    async getAll() {
        return await this.mainPageFieldsService.getAll();
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put()
    async update(@Body() dto: MainPageFieldsDto) {
        return await this.mainPageFieldsService.updateAll(dto);
    }
}
