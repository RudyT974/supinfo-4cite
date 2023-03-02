import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'
import { AuthModule } from './auth/auth.modules';
import { User } from './users/entities/users.entity';
import { Hotel } from './hotels/entities/hotel.entity';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User, Hotel],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    HotelsModule,
  ],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}
