import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Course } from './../courses/courses.model';
import { Payment } from './payments.model';

@Table({tableName: 'payments_courses', createdAt: false, updatedAt: false})
export class PaymentsCourses extends Model<PaymentsCourses> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Payment)
    @Column({type: DataType.INTEGER})
    paymentId: number;

    @ForeignKey(() => Course)
    @Column({type: DataType.INTEGER})
    courseId: number;
}
