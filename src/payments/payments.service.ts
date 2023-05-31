import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';
import { StatisticService } from './../statistic/statistic.service';
import { UserCourses } from './../users/user-courses.model';
import { Course } from './../courses/courses.model';
import { XFields } from './../xfields/xfields.model';
import { PaymentStatus } from './../shared/entities';
import { PaymentsDto } from './dto/payments.dto';
import { Payment } from './payments.model';
import { Promo } from 'src/promo/promo.model';
import { Cart } from 'src/cart/cart.model';
import { TinkoffResponseDto } from './dto/tinkoff-response-dto';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectModel(Payment) private paymentRepository: typeof Payment,
        @InjectModel(Course) private courseRepository: typeof Course,
        @InjectModel(UserCourses) private userCoursesRepository: typeof UserCourses,
        @InjectModel(Promo) private promoRepository: typeof Promo,
        @InjectModel(Cart) private cartRepository: typeof Cart,
        @InjectModel(XFields) private xFieldRepository: typeof XFields,
        private statisticService: StatisticService,
        private httpService: HttpService,
    ) {
    }
    
    async createPayment(dto: PaymentsDto, userId: number) {
        const sale = await this.xFieldRepository.findOne({
            where: {
                code: 'sale',
            }
        });

        let price = 0;
        for(let i = 0; i < dto.courses.length; i++) {
            const course = await this.courseRepository.findByPk(dto.courses[i]);
            price += course.price;
        }

        const promo = dto.promo ? await this.promoRepository.findByPk(dto.promo.id): null;

        if(promo) {
            if(promo.type === 0) {
                price -= price*promo.discount*0.01;
                console.log(price);
            }
            if(promo.type === 1) {
                price -= promo.discount;
            }
        }

        price = dto.courses.length >= 3 ? price - price*(parseInt(sale.value, 10)*0.01) : price;

        price = (price < 0 ? 1 : price)*100;

        const code = uuidv4();
        const data = {
            "TerminalKey": "1647184804609",
            "Amount": price,
            "OrderId": code,
            "Description": "Оплата курсов Badteachers",
            "NotificationURL": 'https://badteachers.ru/api/payments/notification',
            "DATA": {
                "Phone": "+71234567890",
                "Email": "a@test.com"
            },
            "Receipt": {
                "Email": "a@test.ru",
                "Phone": "+79031234567",
                "EmailCompany": "b@test.ru",
                "Taxation": "osn",
                "Items": [{
                    "Name": "Курсы по подготовке к ОГЭ",
                    "Price": price,
                    "Quantity": 1.00,
                    "Amount": price,
                    "PaymentMethod": "full_prepayment",
                    "PaymentObject": "commodity",
                    "Tax": "vat10",
                    "Ean13": "0123456789"
                }]
        }
        };
        const request = await this.httpService.post('https://securepay.tinkoff.ru/v2/Init', data).toPromise();

        const payment = await this.paymentRepository.create({
            status: PaymentStatus.WAIT,
            userId,
            code: code,
        });
        console.log(request.data.PaymentURL);
        dto.courses.forEach(async (element) => await payment.$set('courses', element))

        return {
            url: request.data.PaymentURL,
          }
    }

    async notification(dto: TinkoffResponseDto) {
        const payment = await this.paymentRepository.findOne({
            where: {
                code: dto.OrderId
            },
            include: {all: true, nested: true}
        });
        if(payment && dto.Success && dto.Status !== PaymentStatus.REJECTED) {
            const data = {
                 "TerminalKey": process.env.TINKOFF_TERMINAL,
                 "PaymentId" : dto.PaymentId,
                 "Token" : this.signToken(dto.PaymentId),
             };
             const request = await this.httpService.post('https://securepay.tinkoff.ru/v2/GetState', data).toPromise();
             if(request.data.Status !== PaymentStatus.CONFIRMED) {
                return {
                    confirmed: false,
                }
             }

            payment.courses.forEach(async (courseElement: Course) => {
                const demoLesson = await this.userCoursesRepository.findOne({
                    where: {
                        userId: payment.userId,
                        courseId: courseElement.id
                    }
                });

                if(demoLesson) {
                    await demoLesson.update({pay: true});
                }else{
                    await this.userCoursesRepository.create({
                        pay: true,
                        userId: payment.userId,
                        courseId: courseElement.id,
                    });

                    await this.cartRepository.destroy({
                        where: {
                            userId: payment.userId,
                            courseId: courseElement.id,
                        }
                    });
                }

                await this.statisticService.addStatistic({
                    courseId: courseElement.id
                }, true);
            });
            await payment.destroy();

            return {
                success: true,
            }
        }

        return {
            success: false,
        }
    }

    private signToken(paymentId: string) {
        const password = process.env.TINKOFF_PASSWORD;
        const terminalKey = process.env.TINKOFF_TERMINAL;
        const concat = password + paymentId + terminalKey;
        const { createHash } = require('crypto');
        return createHash('sha256').update(concat).digest('hex');
    }
}
