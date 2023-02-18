import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Lesson } from "src/lessons/lessons.model";
import {Course} from "../courses/courses.model";

@Table({tableName: 'courses_lessons', createdAt: false, updatedAt: false})
export class CoursesLessons extends Model<CoursesLessons> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Lesson)
    @Column({type: DataType.INTEGER})
    lessonId: number;

    @ForeignKey(() => Course)
    @Column({type: DataType.INTEGER})
    courseId: number;
}
