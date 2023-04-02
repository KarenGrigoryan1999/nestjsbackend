import { StatisticCourse } from './statistic-course.model';
import { Course } from './../courses/courses.model';
import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
  } from "sequelize-typescript";
  
  interface StatisticCreationAttrs {
    users: number,
    sales: number,
  }
  
  @Table({ tableName: "statistic" })
  export class Statistic extends Model<Statistic, StatisticCreationAttrs> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;

    @BelongsToMany(() => Course, () => StatisticCourse)
    course: Course[];
  
    @Column({ type: DataType.INTEGER })
    users: number;

    @Column({ type: DataType.INTEGER })
    sales: number;
  }
  