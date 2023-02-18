import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationExecption} from "../exceptions/validation.execption";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);

    if(typeof obj === 'string' || obj === undefined) return value; 

    const errors = await validate(obj);
    if(errors.length) {
      let messages = errors.map(error => {
        return {
          property: error.property,
          error: `${Object.values(error.constraints).join(", ")}`
        }
      })
      
      throw new ValidationExecption({errors: messages});
    }
    
    return value;
  }
}
