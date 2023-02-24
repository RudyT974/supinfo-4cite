import { IsNotEmpty, IsUUID } from "class-validator";

export class UserIdParams {

  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

}