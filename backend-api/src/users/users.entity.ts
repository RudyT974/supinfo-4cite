import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  Length,
  IsStrongPassword,
  IsEmail,
  IsBoolean,
} from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 20)
  pseudo: { type: String, nullable: false, unique: true };

  @Column()
  @IsEmail()
  email: { type: String, nullable: false, unique: true };

  @Column()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  password: { type: String, nullable: false };

  @Column()
  @IsBoolean()
  isAdmin: { type: Boolean, nullable: false, default: false };
}