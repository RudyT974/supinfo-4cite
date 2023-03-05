import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { AdminMock, decoded_employee, decoded_random, EmployeeMock, UpdatedPassword, UserMock, UsersMock } from './data.mock';


let jwt = require('jsonwebtoken');

async function GenerateToken(params) {
  return await jwt.sign({
    id: params.id,
    role: params.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, "JWT_SECRET");
}

describe('CatsController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        entities: [User],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([User])],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('UsersService', () => {
    it('service should be defined', () => {
      expect(usersService).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      let result: User[] = UsersMock;
      const token = await GenerateToken({ id: decoded_random.id, role: decoded_random.role });
      const headers = { 'Authorization': `Bearer ${await token}` };

      jest.spyOn(usersService, 'findAll').mockImplementation(async () => result);

      expect(await usersService.findAll(headers)).toBe(result);
    });

  });

  describe('findById', () => {
    it('should return user data', async () => {
      let result: User = UserMock;
      const idToFind = UserMock.id;
      const token = await GenerateToken({ id: decoded_random.id, role: decoded_random.role });
      const headers = { 'Authorization': `Bearer ${await token}` };

      jest.spyOn(usersService, 'findById').mockImplementation(async () => result);

      expect(await usersService.findById(idToFind, headers)).toBe(result);
    });

    it('should return my user data', async () => {
      let result: User = AdminMock;
      const token = await GenerateToken({ id: decoded_employee.id, role: decoded_employee.role });
      const headers = { 'Authorization': `Bearer ${await token}` };

      jest.spyOn(usersService, 'findById').mockImplementation(async () => result);

      expect(await usersService.findById(decoded_random.id, headers)).toBe(result);
    });
  });

  it('update by id', async () => {
    let result: User = EmployeeMock;
    const token = await GenerateToken({ id: decoded_employee.id, role: decoded_employee.role });
    const headers = { 'authorization': `Bearer ${await token}` };

    jest.spyOn(usersService, 'findById').mockImplementation(async () => result);

    expect(await usersService.update(decoded_random.id, UpdatedPassword, headers)).toBe(undefined); // Promise<void>
  });

  it('delete by id', async () => {
    const token = await GenerateToken({ id: decoded_employee.id, role: decoded_employee.role });
    const headers = { 'authorization': `Bearer ${await token}` };

    jest.spyOn(usersService, 'remove').mockImplementation(async () => undefined);

    expect(await usersService.remove(decoded_random.id, headers)).toBe(undefined); // Promise<void>
  });

});