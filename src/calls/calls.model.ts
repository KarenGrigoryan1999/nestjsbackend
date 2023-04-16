import {
    Column,
    DataType,
    Model,
    Table,
  } from "sequelize-typescript";
  
  interface CallCreationAttrs {
    userData: string;
    phone: string;
  }
  
  @Table({ tableName: "call" })
  export class Call extends Model<Call, CallCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
  
    @Column({ type: DataType.STRING })
    userData: string;
  
    @Column({ type: DataType.STRING })
    phone: string;
  }
   
  