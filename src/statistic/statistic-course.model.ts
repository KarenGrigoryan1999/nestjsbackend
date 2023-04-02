import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from "sequelize-typescript";
import { Course } from './../courses/courses.model';
import { Statistic } from "./static.model";
  
  @Table({ tableName: "statistic_course", createdAt: false, updatedAt: false })
  export class StatisticCourse extends Model<StatisticCourse> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @ForeignKey(() => Statistic)
    @Column({ type: DataType.INTEGER })
    statisticId: number;
  
    @ForeignKey(() => Course)
    @Column({ type: DataType.INTEGER })
    courseId: number;
  }
  