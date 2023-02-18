import {BelongsToMany, Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {LessonsVideos} from "../files/types/lessons-videos.model";
import {File} from "../files/files.model";
import { Question } from "src/questions/question.model";

interface LessonCreationAttrs {
    name: string;
    position: number;
}

@Table({tableName: 'lessons'})
export class Lesson extends Model<Lesson, LessonCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @Column({type: DataType.STRING})
    name: string;

    @Column({ type: DataType.INTEGER })
    position: number;    
    
    @BelongsToMany(() => File, () => LessonsVideos)
    video: File[]
    
    @HasOne(() => Question)
    question: Question;
}