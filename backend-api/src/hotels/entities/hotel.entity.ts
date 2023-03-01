import { HttpException, HttpStatus } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class Hotel {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({ unique: true, nullable: false })
    name : string;

    @Column({ unique: true, nullable: false })
    location : string;

    @Column({nullable: false })
    description: string;

    @Column({nullable: true })
    picture_list : string[];

}
