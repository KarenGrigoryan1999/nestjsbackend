import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { File } from "src/files/files.model";
import { ShopImages } from "./shop-images.model";

interface ShopCreationAttrs {
  name: string;
  description: string;
  price: string;
}

@Table({ tableName: "shop" })
export class Shop extends Model<Shop, ShopCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.INTEGER })
  price: number;

  @BelongsToMany(() => File, () => ShopImages)
  images: File[];
}
