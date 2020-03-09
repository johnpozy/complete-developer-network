import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const environment = {
  production: false,
  typeORM: <TypeOrmModuleOptions>{
    type: 'mariadb',
    host: '127.0.0.1',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'cdn',
    autoLoadEntities: true,
    synchronize: true
  }
};
