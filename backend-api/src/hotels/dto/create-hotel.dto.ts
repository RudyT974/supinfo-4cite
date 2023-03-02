import { isArray, IsEmail, IsJWT, isNotEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";
export class CreateHotelDto {

    @IsNotEmpty()
    @IsUUID()
    readonly id: string

    @IsNotEmpty()
    @IsString()
    @Length(3,25)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,255)
    readonly location: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,2000)
    readonly description: string;


    @IsNotEmpty()
    readonly picture_list: string[]

    

}
