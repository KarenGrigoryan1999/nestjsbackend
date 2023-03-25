import { User } from 'src/users/users.model';
import {
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from "sequelize-typescript";
import { Test } from 'src/tests/tests.model';
import { UserResults } from './user-results.model';

interface ResultCreationAttrs {
    result: number,
    testId: number,
}

@Table({tableName: "results"})
export class Result extends Model<Result, ResultCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        unique: false,
    })
    result: number;

    @BelongsToMany(() => User, () => UserResults)
    users: User[];

    @ForeignKey(() => Test)
    @Column({type: DataType.INTEGER})
    testId: Test;
}
