import { IsEmail, IsNotEmpty, IsStrongPassword, IsUUID, isUUID, Length } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @Length(3, 20)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}

export class UpdateUserDto {

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}

export class UserIdParams {

  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

}