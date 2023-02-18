import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Question } from "src/questions/question.model";
import { Test } from "./tests.model";

@Table({ tableName: "tests_questions", createdAt: false, updatedAt: false })
export class TestsQuestions extends Model<TestsQuestions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Test)
  @Column({ type: DataType.INTEGER })
  testId: number;

  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER })
  questionId: number;
}
