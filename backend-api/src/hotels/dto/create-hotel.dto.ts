import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateHotelDto {


    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 255)
    location: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 2000)
    description: string;

    picture_list: string[];



}
