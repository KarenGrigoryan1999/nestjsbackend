import {Column, DataType, ForeignKey, Model, Table,} from "sequelize-typescript";
import {User} from "src/users/users.model";
import {Course} from "../courses/courses.model";

@Table({tableName: "user_courses", createdAt: false, updatedAt: false})
export class UserCourses extends Model<UserCourses> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Course)
    @Column({type: DataType.INTEGER})
    courseId: number;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    pay: boolean;

    @Column({type: DataType.DATE})
    end_date: boolean; 
}
