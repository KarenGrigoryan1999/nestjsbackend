import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Teacher } from "../teachers/teachers.model";
import { TeacherCourses } from "../teachers/teacher-courses.model";
import { File } from "../files/files.model";
import { CoursesFiles } from "../files/types/courses-files.model";
import { CoursesPhotos } from "../files/types/courses-photos.model";
import { Lesson } from "src/lessons/lessons.model";
import { CoursesLessons } from "./courses-lessons.model";
import { Test } from "src/tests/tests.model";
import { CoursesTests } from "./courses-tests.model";

interface CourseCreationAttrs {
  name: string;
  slang_name: string;
  slang_name_alternative: string;
  cabinet: string;
  description: string;
  theme: string;
  price: number;
  sale_price: number;
  color: string;
}

@Table({ tableName: "courses" })
export class Course extends Model<Course, CourseCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  slang_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  slang_name_alternative: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cabinet: string;

  @Column({ type: DataType.STRING, allowNull: false })
  color: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  theme: string;

  @Column({ type: DataType.STRING })
  question_1: string;

  @Column({ type: DataType.STRING })
  question_2: string;

  @Column({ type: DataType.STRING })
  question_3: string;

  @Column({ type: DataType.STRING })
  answer_1: string;

  @Column({ type: DataType.STRING })
  answer_2: string;

  @Column({ type: DataType.STRING })
  answer_3: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  sale_price: number;

  @BelongsToMany(() => Lesson, () => CoursesLessons)
  lessons: Lesson[];

  @BelongsToMany(() => Test, () => CoursesTests)
  tests: Test[];

  @BelongsToMany(() => File, () => CoursesFiles)
  file: File[];

  @BelongsToMany(() => File, () => CoursesPhotos)
  photo: File[];

  @BelongsToMany(() => Teacher, () => TeacherCourses)
  teachers: Teacher[];
}
