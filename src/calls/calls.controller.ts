import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CallDto } from './call.dto';
import { CallsService } from './calls.service';

@Controller('api/calls')
export class CallsController {
    constructor(
        private callsService: CallsService,
    ) {}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    async getAll() {
        return await this.callsService.getAll();
    }

    @Post()
    async create(@Body() dto: CallDto) {
        return await this.callsService.create(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.callsService.delete(id)
    }
}
