import { PaymentsCourses } from './payments-courses.model';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsToMany,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "src/courses/courses.model";
import { User } from 'src/users/users.model';
import { PaymentStatus } from 'src/shared/entities';

interface PaymentCreationAttrs {
  status: PaymentStatus,
  code: string,
  userId: number,
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, PaymentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  status: PaymentStatus;

  @Column({ type: DataType.STRING, allowNull: false })
  code: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsToMany(() => Course, () => PaymentsCourses)
  courses: Course[];
}
