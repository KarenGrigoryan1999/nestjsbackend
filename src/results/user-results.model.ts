import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Result } from "./results.model";
import { User } from "src/users/users.model";

@Table({tableName: 'user_results', createdAt: false, updatedAt: false})
export class UserResults extends Model<UserResults> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    
    @ForeignKey(() => Result)
    @Column({type: DataType.INTEGER})
    resultId: number;
}
