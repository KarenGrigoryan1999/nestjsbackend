import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { LearnStagesDto } from './dto/learn-stages.dto';
import { LearnStagesService } from './learn-stages.service';

@Controller('api/learn-stages')
export class LearnStagesController {
    constructor(private learnStagesService: LearnStagesService) {}
    
    @Get()
    getLessons() {
      return this.learnStagesService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
      return this.learnStagesService.getById(id);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createStage(@Body() dto: LearnStagesDto) {
      return this.learnStagesService.createStage(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put("/:id")
    updateStage(@Body() dto: LearnStagesDto, @Param('id') id: string) {
      return this.learnStagesService.updateStage(id, dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete("/:id")
    deleteStage(@Param('id') id: string) {
      return this.learnStagesService.deleteStage(id);
    }
}
