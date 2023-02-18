import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface CartCreationAttrs {
  userId: number;
  courseId: number;
}

@Table({ tableName: "cart" })
export class Cart extends Model<Cart, CartCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.INTEGER })
  courseId: number;
}
 
