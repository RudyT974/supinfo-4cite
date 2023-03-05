import { IsNotEmpty, IsUUID } from "class-validator";

export class BookingIdParams {

  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  // @IsNotEmpty()
  // readonly arrivalDate: Date;

  // @IsNotEmpty()
  // readonly departureDate: Date;

}