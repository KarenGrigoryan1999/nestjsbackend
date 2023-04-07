import { Course } from './../courses/courses.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PaymentStatus } from './../shared/entities';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentsDto } from './dto/payments.dto';
import { Payment } from './payments.model';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectModel(Payment) private paymentRepository: typeof Payment,
        @InjectModel(Course) private courseRepository: typeof Course,
        private httpService: HttpService,
    ) {
    }
    
    async createPayment(dto: PaymentsDto, userId: number) {
        const items = [];
        for(let i = 0; i < dto.courses.length; i++) {
            const course = await this.courseRepository.findByPk(dto.courses[i]);
            items.push({
                "Name": course.name,
                "Price": (dto.courses.length > 3 ? course.price : course.sale_price) * 100,
                "Quantity": 1.00,
                "Amount": (dto.courses.length > 3 ? course.price : course.sale_price) * 100,
                "PaymentMethod": "full_prepayment",
                "PaymentObject": "commodity",
                "Tax": "vat10",
                "Ean13": "0123456789"
            });
        }
        const code = uuidv4();
        const data = {
            "TerminalKey": "TinkoffBankTest",
            "Amount": items.reduce((acc, element) => acc + element.Price, 0),
            "OrderId": code,
            "Description": "Оплата курсов Badteachers",
            "NotificationURL": 'http://localhost:7070/api/payment/notification',
            "DATA": {
                "Phone": "+71234567890",
                "Email": "a@test.com"
            },
            "Receipt": {
                "Email": "a@test.ru",
                "Phone": "+79031234567",
                "EmailCompany": "b@test.ru",
                "Taxation": "osn",
                "Items": items
            }
        };
        const request = await this.httpService.post('https://securepay.tinkoff.ru/v2/Init', data).toPromise();

        const payment = await this.paymentRepository.create({
            status: PaymentStatus.WAIT,
            userId,
            code
        });
        console.log(request.data.PaymentURL);
        dto.courses.forEach(async (element) => await payment.$set('courses', element))

        return {
            url: request.data.PaymentURL,
          }
    }
}
