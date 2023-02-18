import { Column, DataType, Model, Table } from "sequelize-typescript";

interface XFieldsCreationAttrs {
  code: string;
  value: string;
}

@Table({ tableName: "xfields", createdAt: false, updatedAt: false })
export class XFields extends Model<XFields, XFieldsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  code: string;

  @Column({ type: DataType.STRING })
  value: string;
}
