const argon2 = require('argon2');
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './../users/entities/users.entity';
import { Repository } from "typeorm";
import { Token, LoginUserDto, RegisterUserDto } from "./dto/auth.dto";
import { GenerateToken } from "./utils/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async login(loginData: LoginUserDto): Promise<Token> {
    const user = await this.usersRepository.findOne({ where: { email: loginData.email }, select: ['id', 'password', 'role'] });

    if (!user)
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);

    if (await argon2.verify(user.password, loginData.password)) {
      try {
        return await GenerateToken({ id: user.id, role: user.role })
      } catch (error) {
        throw new HttpException({ message: 'Error during token generation' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException({ message: 'Wrong password' }, HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(user: RegisterUserDto) {

    if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ username: user.username }))
      throw new HttpException({ message: 'User may already exist' }, HttpStatus.BAD_REQUEST);

    try {
      // Known Issue : https://github.com/typeorm/typeorm/issues/8706
      await this.usersRepository.save(this.usersRepository.create(user))
    } catch (error) {
      throw new HttpException({ message: 'Error creating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  async createEmployee(user: RegisterUserDto) {

    if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ username: user.username }))
      throw new HttpException({ message: 'User may already exist' }, HttpStatus.BAD_REQUEST);

    const employeeData = {
      username: user.username,
      email: user.email,
      password: user.password,
      role: 'employee'
    }

    try {
      // Known Issue : https://github.com/typeorm/typeorm/issues/8706
      await this.usersRepository.save(this.usersRepository.create(employeeData))
    } catch (error) {
      throw new HttpException({ message: 'Error creating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async createAdmin(user: RegisterUserDto) {

    if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ username: user.username }))
      throw new HttpException({ message: 'User may already exist' }, HttpStatus.BAD_REQUEST);

    const adminData = {
      username: user.username,
      email: user.email,
      password: user.password,
      role: 'admin'
    }

    try {
      // Known Issue : https://github.com/typeorm/typeorm/issues/8706
      await this.usersRepository.save(this.usersRepository.create(adminData))
    } catch (error) {
      throw new HttpException({ message: 'Error creating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}