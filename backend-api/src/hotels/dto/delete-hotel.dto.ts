import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hotel.dto';
import { isArray, IsEmail, IsJWT, isNotEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";
export class deleteHotelDto extends PartialType(CreateHotelDto) {
    @IsString()
    @Length(3,25)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,255)
    location: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,2000)
    description: string;

    picture_list: string[]
    
}
