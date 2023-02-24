import { IsEmail, IsJWT, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";

export class LoginUserDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}

export class RegisterUserDto {

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

export class Token {

  @IsNotEmpty()
  @IsJWT()
  readonly token: string;

}

export class TokenStructure {

  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;

}