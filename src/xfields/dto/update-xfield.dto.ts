import { IsNumber, Length } from "class-validator";

export class UpdateXFieldDto {
  readonly code: string;
  readonly value: string;
}
