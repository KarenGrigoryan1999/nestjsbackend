import { IsNumber } from "class-validator";

export class CompleteTestDto {
  readonly testId: number;

  @IsNumber()
  readonly result: number;
}
