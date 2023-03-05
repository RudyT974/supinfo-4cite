import {IsNotEmpty} from "class-validator";
export class UpdateHotelDto {

@IsNotEmpty()
description: string;
    
}