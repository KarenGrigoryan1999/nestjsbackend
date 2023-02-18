import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { File } from "../files.model";
import { User } from "src/users/users.model";

@Table({ tableName: "user_avatars", createdAt: false, updatedAt: false })
export class UserAvatars extends Model<UserAvatars> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => File)
  @Column({ type: DataType.INTEGER })
  fileId: number;
}
