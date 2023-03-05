import { IsNotEmpty,IsString, Length} from "class-validator";
export class CreateBookingDto {


    @IsNotEmpty()
    @IsString()
    @Length(3,25)
    name: string;

    @IsNotEmpty()
    @IsString()
    idClient: string;

    @IsNotEmpty()
    @IsString()
    idHotel: string;

    
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    reservationDate: Date;

    @IsNotEmpty()
    @IsString()
    arrivalDate: Date;

    @IsNotEmpty()
    @IsString()
    departureDate: Date;
}
