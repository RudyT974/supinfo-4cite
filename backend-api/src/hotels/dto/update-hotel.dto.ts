import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hotel.dto';
import { isArray, IsEmail, IsJWT, isNotEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";

export class UpdateHotelDto extends PartialType(CreateHotelDto) {

    
}
