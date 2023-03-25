import { Column, DataType, Model, Table } from "sequelize-typescript";

  
  interface PromoCreationAttrs {
    name: string;
    discount: number;
    type: number;
  }
  
  @Table({ tableName: "promo" })
  export class Promo extends Model<Promo, PromoCreationAttrs> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;
  
    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    discount: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    type: number;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    count: number;
  }
  