import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface RolesCreationAttrs {
  name: string;
  catalog: string;
  is_private: boolean;
}

@Table({ tableName: "files", createdAt: false, updatedAt: false })
export class File extends Model<File, RolesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  catalog: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_private: boolean;
}
