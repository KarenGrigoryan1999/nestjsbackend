import { LessonsUsers } from './../lessons/lessons-users.model';
import { ExternalAuth } from './../external-auth/external-auth.model';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import { Course } from "src/courses/courses.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { UserCourses } from "./user-courses.model";
import { File } from "../files/files.model";
import { UserAvatars } from "src/files/types/user-avatars.model";
import { Lesson } from 'src/lessons/lessons.model';
import { Payment } from 'src/payments/payments.model';

interface UserCreationAttrs {
  email: string;
  name: string;
  lastName: string;
  password: string;
  activation_code: string;
  email_confirmed: boolean;
  balance?: number;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  activation_code: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  email_confirmed: boolean;

  @Column({ type: DataType.STRING, defaultValue: "" })
  email_reset_code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  phone_confirmed: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  balance: number;

  @BelongsToMany(() => File, () => UserAvatars)
  avatar: File;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @BelongsToMany(() => Course, () => UserCourses)
  courses: Course[];

  @BelongsToMany(() => Lesson, () => LessonsUsers)
  lessons: Lesson[];

  @HasMany(() => Payment)
  users: Payment[];

  @ForeignKey(() => ExternalAuth)
  @Column({ type: DataType.INTEGER, allowNull: true })
  externalAuthId: number;
}
