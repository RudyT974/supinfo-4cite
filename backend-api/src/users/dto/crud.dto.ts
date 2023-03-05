import { IsNotEmpty, IsStrongPassword } from 'class-validator';


export class UpdateUserDto {

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}

