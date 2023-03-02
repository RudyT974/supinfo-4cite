const argon2 = require('argon2');
import { HttpException, HttpStatus } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error) {
      console.log(error)
      throw new HttpException({ message: 'Error hashing password' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Column({ default: "customer" })
  role: string;
}