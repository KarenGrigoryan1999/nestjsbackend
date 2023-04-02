import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { StatisticDto } from './dto/statistic.dto';

@Controller('api/statistic')
export class StatisticController {
    constructor(private statisticService: StatisticService){}

    @Put()
    addStatistic(@Body() dto: StatisticDto) {
      return this.statisticService.addStatistic(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getStatistic() {
        return this.statisticService.getStatistic();
    }
}
