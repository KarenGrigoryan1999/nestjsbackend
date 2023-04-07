import { Body, Controller, Post, Redirect, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PaymentsDto } from './dto/payments.dto';
import { PaymentsService } from './payments.service';

@Controller('api/payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService){}

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Redirect()
    @Post()
    async createPayment(@Request() req, @Body() dto: PaymentsDto) {
        return await this.paymentsService.createPayment(dto, req.user.id);
    }
}
