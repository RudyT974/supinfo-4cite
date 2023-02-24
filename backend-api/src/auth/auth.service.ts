const argon2 = require('argon2');
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/auth.dto";

// https://www.youtube.com/watch?v=_L225zpUK0M&ab_channel=MariusEspejo
// https://www.youtube.com/watch?v=wdsp7BNmJRc&ab_channel=MariusEspejo

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async login(loginData: LoginUserDto) {
    const user = await this.usersRepository.findOneBy({ email: loginData.email });
    const userpass = await this.usersRepository.findOneBy({ password: loginData.password })
    console.log(user)

    if (!user)
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);


    try {
      if (await argon2.verify("<big long hash>", "password")) {
        // password match
      } else {
        // password did not match
      }
    } catch (err) {
      // internal failure
    }

    try {
      return user;
    } catch (error) {
      throw new HttpException({ message: 'Error finding user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}