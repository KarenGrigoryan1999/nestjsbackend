import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { File } from "src/files/files.model";
import { Shop } from "./shop.model";

@Table({ tableName: "shop_images", createdAt: false, updatedAt: false })
export class ShopImages extends Model<ShopImages> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Shop)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @ForeignKey(() => File)
  @Column({ type: DataType.INTEGER })
  imageId: number;
}
