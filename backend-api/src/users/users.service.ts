import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async findAll(): Promise<User[]> {

    try {
      return await this.usersRepository.find()
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


  async create(user: CreateUserDto) {

    if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ username: user.username }))
      throw new HttpException({ message: 'User may already exist' }, HttpStatus.BAD_REQUEST);

    try {
      // Known Issue : https://github.com/typeorm/typeorm/issues/8706
      await this.usersRepository.save(this.usersRepository.create(user))
    } catch (error) {
      console.log(error)
      throw new HttpException({ message: 'Error creating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
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

