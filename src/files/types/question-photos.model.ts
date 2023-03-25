import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Test } from "src/tests/tests.model";
import {File} from "../files.model";
import { Question } from '../../questions/question.model';

@Table({tableName: 'question_photos', createdAt: false, updatedAt: false})
export class QuestionPhotos extends Model<QuestionPhotos> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => File)
    @Column({type: DataType.INTEGER})
    photoId: number;
    
    @ForeignKey(() => Question)
    @Column({type: DataType.INTEGER})
    questionId: number;
}
