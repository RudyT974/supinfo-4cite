import { IsNotEmpty, IsUUID } from "class-validator";

export class HotelIdParams {

  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

}