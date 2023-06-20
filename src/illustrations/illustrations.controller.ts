import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { IllustrationsService } from './illustrations.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateIllustrationDto } from './dto/create-illustration.dto';

@Controller('api/illustrations')
export class IllustrationsController {
  constructor(private readonly illustrationsService: IllustrationsService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateIllustrationDto) {
      return this.illustrationsService.create(dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.illustrationsService.findAll();
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.illustrationsService.findOne(+id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateIllustrationDto) {
    return this.illustrationsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.illustrationsService.remove(+id);
  }
}
