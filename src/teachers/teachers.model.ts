import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { TeacherCourses } from "./teacher-courses.model";
import { Course } from "../courses/courses.model";
import { File } from "../files/files.model";
import { TeacherPhotos } from "../files/types/teacher-photos.model";
import { TeacherVideos } from "../files/types/teacher-videos.model";
import { TeacherVideoPreview } from "src/files/types/teacher-video-preview.model";

interface TeacherCreationAttrs {
  name: string;
  last_name: string;
  patronymic: string;
  text: string;
  instagram: string;
  experience: string;
}

@Table({ tableName: "teachers" })
export class Teacher extends Model<Teacher, TeacherCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  patronymic: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  instagram: string;

  @Column({
    type: DataType.STRING,
  })
  illustration_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  experience: string;

  @BelongsToMany(() => File, () => TeacherPhotos)
  photos: File[];

  @BelongsToMany(() => File, () => TeacherVideoPreview)
  video_preview: File[];

  @BelongsToMany(() => File, () => TeacherVideos)
  video: File[];

  @BelongsToMany(() => Course, () => TeacherCourses)
  courses: Course[];
}
