const argon2 = require('argon2');
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { Token, LoginUserDto, RegisterUserDto } from "./dto/auth.dto";
import { GenerateToken } from "./utils/jwt";

// https://www.youtube.com/watch?v=_L225zpUK0M&ab_channel=MariusEspejo
// https://www.youtube.com/watch?v=wdsp7BNmJRc&ab_channel=MariusEspejo

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

    try {
      if (await argon2.verify(user.password, loginData.password)) {
        return await GenerateToken({ id: user.id, role: user.role })
      } else {
        throw new HttpException({ message: 'Wrong password' }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException({ message: 'Error during token validation' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async create(user: RegisterUserDto) {

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

}