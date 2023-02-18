import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {File} from "../files.model";
import {Course} from "../../courses/courses.model";

@Table({tableName: 'courses_files', createdAt: false, updatedAt: false})
export class CoursesFiles extends Model<CoursesFiles> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Course)
    @Column({type: DataType.INTEGER})
    courseId: number;
    
    @ForeignKey(() => File)
    @Column({type: DataType.INTEGER})
    fileId: number;
}
