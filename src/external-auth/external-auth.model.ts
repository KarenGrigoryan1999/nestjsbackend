import {
    BelongsToMany,
    Column,
    DataType,
    HasOne,
    Model,
    Table,
  } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { externalAuthMethods } from "./interfaces/external-auth-type.interface";
  
  interface ExternalAuthCreationAttrs {
    external_id: string;
    auth_method: externalAuthMethods;
  }
  
  @Table({ tableName: "external_auth" })
  export class ExternalAuth extends Model<ExternalAuth, ExternalAuthCreationAttrs> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    external_id: string;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    auth_method: externalAuthMethods;
  
    @HasOne(() => User)
    user: User;
  }
  