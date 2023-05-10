import { Body, Controller, Param, Post, Redirect, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PaymentsDto } from './dto/payments.dto';
import { TinkoffResponseDto } from './dto/tinkoff-response-dto';
import { PaymentsService } from './payments.service';

@Controller('api/payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService){}

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Post()
    async createPayment(@Request() req, @Body() dto: PaymentsDto) {
        return await this.paymentsService.createPayment(dto, req.user.id);
    }

    @Post('/notification/:code')
    async notification(@Param('code') code, @Body() dto: TinkoffResponseDto){
        //TODO подтверждение оплаты
        return await this.paymentsService.notification(dto);
    }

    @Post('/notification')
    async notification2(){
        //TODO подтверждение оплаты
        console.log('hello 888');
        return false;
    }
}
