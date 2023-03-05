import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './../auth/dto/auth.dto';
import { DecodeToken } from '../auth/utils/jwt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async findAll(headers: any): Promise<User[]> {
    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    try {
      switch (decoded.role) {
        case 'employee':
          return await this.usersRepository.findBy({ role: 'customer' })
        case 'admin':
          return await this.usersRepository.find()
      }
    } catch (error) {
      throw new HttpException({ message: 'Error finding users' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findById(id: string, headers: any): Promise<User> {

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    if (decoded.role === 'customer' && decoded.id !== id) {
      throw new HttpException({ message: 'You are not allowed to access this resource' }, HttpStatus.UNAUTHORIZED);
    }

    if (decoded.id === id) {
      const user = await this.usersRepository.findOneBy({ id })
      if (!user)
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      else
        return user;
    }

    if (decoded.role === 'employee') {
      const user = await this.usersRepository.findOneBy({ id, role: 'customer' })
      if (!user)
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      else
        return user;
    }

    if (decoded.role === 'admin') {
      const user = await this.usersRepository.findOneBy({ id })
      if (!user)
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      else
        return user;

    }
  }


  async remove(id: string, headers: any): Promise<void> {

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    if (decoded.id === id) {
      const user = await this.usersRepository.findOneBy({ id })
      if (!user) {
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        await this.usersRepository.delete(id);
      } catch (error) {
        throw new HttpException({ message: 'Error deleting user' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    if (decoded.role === 'admin') {
      const user = await this.usersRepository.findOneBy({ id })
      if (!user) {
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        await this.usersRepository.delete(id);
      } catch (error) {
        throw new HttpException({ message: 'Error deleting user' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }

    }
  }

  async update(id: string, userData: UpdateUserDto, headers: any): Promise<void> {

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    if (decoded.id === id) {
      const oldUserData = await this.usersRepository.findOneBy({ id });
      if (!oldUserData) {
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      }

      try {
        delete oldUserData.password;
        const updatedUserData = Object.assign(oldUserData, userData);
        await this.usersRepository.save(updatedUserData);
      } catch (error) {
        throw new HttpException({ message: 'Error updating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  }
}
