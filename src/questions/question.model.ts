import { QuestionPhotos } from './../files/types/question-photos.model';
import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Lesson} from "src/lessons/lessons.model";
import { File } from "../files/files.model";

interface QuestionCreationAttrs {
    question: string;
    answer_1: string;
    answer_2: string;
    answer_3: string;
    answer_4: string;
    correct_answer: string;
    cost: string;
    type: string;
    position: number;
}

@Table({tableName: "questions"})
export class Question extends Model<Question, QuestionCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({type: DataType.STRING})
    question: string;

    @Column({type: DataType.STRING})
    type: string;

    @Column({type: DataType.STRING})
    answer_1: string;

    @Column({type: DataType.STRING})
    answer_2: string;

    @Column({type: DataType.STRING})
    answer_3: string;

    @Column({type: DataType.STRING})
    answer_4: string;

    @Column({type: DataType.STRING})
    correct_answer: string;

    @Column({type: DataType.INTEGER, defaultValue: 1})
    cost: number;

    @Column({type: DataType.INTEGER, defaultValue: 1})
    position: number;

    @BelongsToMany(() => File, () => QuestionPhotos)
    photos: File[];

    @ForeignKey(() => Lesson)
    lesson: Lesson;
}
