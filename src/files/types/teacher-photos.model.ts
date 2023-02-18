import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {File} from "../files.model";
import {Teacher} from "../../teachers/teachers.model";

@Table({tableName: 'teacher_photos', createdAt: false, updatedAt: false})
export class TeacherPhotos extends Model<TeacherPhotos> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => File)
    @Column({type: DataType.INTEGER})
    photoId: number;
    
    @ForeignKey(() => Teacher)
    @Column({type: DataType.INTEGER})
    teacherId: number;
}
