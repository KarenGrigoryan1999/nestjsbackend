import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { LearnStages } from "./learn-stages.model";
import { File } from "src/files/files.model";

@Table({tableName: 'learn-stages_photos', createdAt: false, updatedAt: false})
export class LearnStagesPhotos extends Model<LearnStagesPhotos> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => LearnStages)
    @Column({type: DataType.INTEGER})
    learnStagesId: number;

    @ForeignKey(() => File)
    @Column({type: DataType.INTEGER})
    photoId: number;
}
