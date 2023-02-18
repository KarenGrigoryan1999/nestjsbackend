import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Test } from "src/tests/tests.model";
import { Course } from "../courses/courses.model";

@Table({ tableName: "courses_tests", createdAt: false, updatedAt: false })
export class CoursesTests extends Model<CoursesTests> {
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

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER })
  courseId: number;
}
