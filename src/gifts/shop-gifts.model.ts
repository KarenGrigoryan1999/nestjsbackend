import { Gifts } from './gifts.model';
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
  } from "sequelize-typescript";
import { Shop } from "src/shop/shop.model";
  
  @Table({ tableName: "shop_giftss", createdAt: false, updatedAt: false })
  export class ShopGifts extends Model<ShopGifts> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @ForeignKey(() => Shop)
    @Column({ type: DataType.INTEGER })
    shopId: number;
  
    @ForeignKey(() => Gifts)
    @Column({ type: DataType.INTEGER })
    giftId: number;
  }
  