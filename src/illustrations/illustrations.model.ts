import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { File } from "../files/files.model";
import { IllustrationsPhotos } from "src/files/types/illustrations-files.model";

interface IllustrationsCreationAttrs {
    name: string,
    photo: number
}

@Table({ tableName: "illustrations", createdAt: false, updatedAt: false })
export class Illustrations extends Model<Illustrations, IllustrationsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => File, () => IllustrationsPhotos)
  photo: File[];
}