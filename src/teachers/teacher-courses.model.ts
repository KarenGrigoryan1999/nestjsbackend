import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { User } from "src/users/users.model";
import {Teacher} from "./teachers.model";
import {Course} from "../courses/courses.model";

@Table({tableName: 'teacher_courses', createdAt: false, updatedAt: false})
export class TeacherCourses extends Model<TeacherCourses> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Teacher)
    @Column({type: DataType.INTEGER})
    teacherId: number;

    @ForeignKey(() => Course)
    @Column({type: DataType.INTEGER})
    courseId: number;
}
