import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto {

    @IsNotEmpty()
    arrivalDate: Date;

    @IsNotEmpty()
    departureDate: Date;

}
