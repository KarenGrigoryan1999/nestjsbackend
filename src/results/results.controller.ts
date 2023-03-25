import { ResultsService } from './results.service';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('results')
export class ResultsController {
    constructor(private resultService: ResultsService) {}

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Get()
    async getScore(@Request() req) {
        return await this.resultService.getScore(req.user.id);
    }
}
