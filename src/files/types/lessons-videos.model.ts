import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {File} from "../files.model";
import {Lesson} from "../../lessons/lessons.model";

@Table({tableName: 'lessons_videos', createdAt: false, updatedAt: false})
export class LessonsVideos extends Model<LessonsVideos> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => File)
    @Column({type: DataType.INTEGER})
    videoId: number;

    @ForeignKey(() => Lesson)
    @Column({type: DataType.INTEGER})
    lessonId: number;
}
