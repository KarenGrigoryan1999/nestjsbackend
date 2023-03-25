import { BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import { File } from "src/files/files.model";
import { LearnStagesPhotos } from "./learn-stages-photos.dto";

@Table({tableName: 'learn-stages', createdAt: false, updatedAt: false})
export class LearnStages extends Model<LearnStages> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    title: string;

    @Column({type: DataType.INTEGER})
    smileType: number;

    @BelongsToMany(() => File, () => LearnStagesPhotos)
    photos: File[];
}
