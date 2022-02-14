import * as path from 'path';
import CustomNamingStrategy from './CustomNamingStrategy';

/**
 * Test
 */
export const ormconfig = () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: 'bookshelf_test',
    entities: ['./dist/**/*.entity{.ts,.js}'],
    migrations: ['./dist/**/migrations/*{.ts,.js}'],
    seeds: ['./src/spec/seeds/**/*{.ts,.js}'],
    factories: ['./src/spec/factories/**/*{.ts,.js}'],
    synchronize: true,
    connectTimeout: 30 * 1000,
    logging: true,
    cli: {
      entitiesDir: './src/**',
      migrationsDir: './src/migrations',
    },
    namingStrategy: new CustomNamingStrategy(),
    bigNumberStrings: false,
    autoLoadEntities: true,
  },
});

export default ormconfig().database;
