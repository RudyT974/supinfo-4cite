import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
export class Booking {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    

    @Column()
    name:string;

    @Column()
    idClient: string;
  
    @Column()
    idHotel: string;
  
    @Column()
    description: string;
  
    @Column()
    reservationDate: Date;
    
    @Column()
    arrivalDate: Date;

    @Column()
    departureDate: Date;

  }
  export default Booking;
