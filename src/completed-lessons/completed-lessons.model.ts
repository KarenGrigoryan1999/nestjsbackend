import {Column, DataType, Model, Table} from "sequelize-typescript";

interface CompletedLessonCreationAttrs {
    userId: number;
    courseId: number;
    lessonId: number;
}
 
@Table({tableName: 'completed_lessons'})
export class CompletedLesson extends Model<CompletedLesson, CompletedLessonCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER})
    userId: number;

    @Column({type: DataType.INTEGER})
    courseId: number;

    @Column({type: DataType.INTEGER})
    lessonId: number;
}
