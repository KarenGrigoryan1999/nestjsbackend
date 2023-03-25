import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Lesson } from "./lessons.model";

@Table({tableName: 'lessons_users', createdAt: false, updatedAt: false})
export class LessonsUsers extends Model<LessonsUsers> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Lesson)
    @Column({type: DataType.INTEGER})
    lessonId: number;
}
