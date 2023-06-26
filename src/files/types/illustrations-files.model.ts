import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {File} from "../files.model";
import { Illustrations } from "src/illustrations/illustrations.model";

@Table({tableName: 'illustrations_photos', createdAt: false, updatedAt: false})
export class IllustrationsPhotos extends Model<IllustrationsPhotos> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Illustrations)
    @Column({type: DataType.INTEGER})
    illustrationsId: number;
    
    @ForeignKey(() => File)
    @Column({type: DataType.INTEGER})
    photoId: number;
}
