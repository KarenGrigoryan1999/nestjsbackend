import { Shop } from './../shop/shop.model';
import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
  } from "sequelize-typescript";
import { ShopGifts } from './shop-gifts.model';
  
  interface GiftsCreationAttrs {
    address: string;
    mail: string;
    phone: string;
  }
  
  @Table({ tableName: "gifts", createdAt: false, updatedAt: false })
  export class Gifts extends Model<Gifts, GiftsCreationAttrs> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    address: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    mail: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    phone: boolean;

    @BelongsToMany(() => Shop, () => ShopGifts)
    shops: Shop[];
  }
  