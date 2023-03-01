import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DecodeToken } from 'src/auth/utils/jwt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }




  async findAll(req: any): Promise<User[]> {
    try {
      const token = await req.headers.authorization.split(' ')[1];
      const decoded = await DecodeToken(token);

      if (decoded.role === 'employee') {
        return await this.usersRepository.findBy({ role: 'customer' })
      }

      if (decoded.role === 'admin') {
        return await this.usersRepository.find()
      }

    } catch (error) {
      throw new HttpException({ message: 'Error finding users' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findById(id: string): Promise<User> {

    const user = await this.usersRepository.findOneBy({ id });

    if (!user)
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);

    try {
      return user;
    } catch (error) {
      throw new HttpException({ message: 'Error finding user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  async remove(id: string): Promise<void> {

    const user = await this.usersRepository.findOneBy({ id });

    if (!user)
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);

    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException({ message: 'Error deleting user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async update(id: string, userData: UpdateUserDto) {

    const oldUserData = await this.usersRepository.findOneBy({ id });

    if (!oldUserData)
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);

    delete oldUserData.password;
    const updatedUserData = Object.assign(oldUserData, userData);

    try {
      await this.usersRepository.save(updatedUserData);
    } catch (error) {
      throw new HttpException({ message: 'Error updating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}

