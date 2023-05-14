import {
    Column,
    DataType,
    Model,
    Table,
  } from "sequelize-typescript";
  
  interface IMainPageFields {
    boysSpotTitle: string;
    boysSpotText: string;
    boysSpotButtonTitle: string;
    boysSpotButtonLink: string;
    purpureSpotTitle: string;
    purpureSpotText: string;
    turquoiseSpotTitle: string;
    turquoiseSpotText: string;
    blueSpotTitle: string;
    blueSpotText: string;
    crimsonSpotTitle: string;
    crimsonSpotText: string;
  }
  
  @Table({ tableName: "main_page_fields" })
  export class MainPageFields extends Model<MainPageFields, IMainPageFields> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
 
    @Column({ type: DataType.TEXT })
    boysSpotTitle: string;

    @Column({ type: DataType.TEXT })
    boysSpotText: string;

    @Column({ type: DataType.TEXT })
    boysSpotButtonTitle: string;

    @Column({ type: DataType.TEXT })
    boysSpotButtonLink: string;

    @Column({ type: DataType.TEXT })
    purpureSpotTitle: string;
  
    @Column({ type: DataType.TEXT })
    purpureSpotText: string;

    @Column({ type: DataType.TEXT })
    turquoiseSpotTitle: string;
  
    @Column({ type: DataType.TEXT })
    turquoiseSpotText: string;

    @Column({ type: DataType.TEXT })
    blueSpotTitle: string;
  
    @Column({ type: DataType.TEXT })
    blueSpotText: string;

    @Column({ type: DataType.TEXT })
    crimsonSpotTitle: string;
  
    @Column({ type: DataType.TEXT })
    crimsonSpotText: string;
  }
   
  