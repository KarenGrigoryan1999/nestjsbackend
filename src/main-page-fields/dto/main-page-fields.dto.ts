import { IsEmpty, IsNotEmpty } from "class-validator";
  
  export class MainPageFieldsDto {
    @IsNotEmpty()
    boysSpotTitle: string;
    @IsNotEmpty()
    boysSpotText: string;
    @IsNotEmpty()
    boysSpotButtonTitle: string;
    @IsNotEmpty()
    boysSpotButtonLink: string;
    @IsNotEmpty()
    boysRedSpotTitle: string;
    @IsNotEmpty()
    boysRedSpotText: string;
    @IsNotEmpty()
    boysRedSpotButtonTitle: string;
    @IsNotEmpty()
    boysRedSpotButtonLink: string;
    @IsNotEmpty()
    purpureSpotTitle: string;
    @IsNotEmpty()
    purpureSpotText: string;
    @IsNotEmpty()
    turquoiseSpotTitle: string;
    @IsNotEmpty()
    turquoiseSpotText: string;
    @IsNotEmpty()
    blueSpotTitle: string;
    @IsNotEmpty()
    blueSpotText: string;
    @IsNotEmpty()
    crimsonSpotTitle: string;
    @IsNotEmpty()
    crimsonSpotText: string;
  }
