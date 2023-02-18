import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Question } from "src/questions/question.model";
import { TestsQuestions } from "./tests-questions.model";

interface TestCreationAttrs {
  name: string;
}

@Table({ tableName: "tests" })
export class Test extends Model<Test, TestCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  position: number;

  @BelongsToMany(() => Question, () => TestsQuestions)
  questions: Question[];
}
