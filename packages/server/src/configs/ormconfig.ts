import CustomNamingStrategy from './CustomNamingStrategy';

/**
 * MEMO: appとmigration時どちらからも共通の設定を参照できるようにするために用意
 */
export const ormconfig = () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? 'bookshelf_test' : 'bookshelf',
    entities: ['./dist/**/*.entity{.ts,.js}'],
    migrations: ['./dist/**/migrations/*{.ts,.js}'],
    seeds: ['./src/spec/seeds/**/*{.ts,.js}'],
    factories: ['./src/spec/factories/**/*{.ts,.js}'],
    synchronize: false,
    connectTimeout: 30 * 1000,
    logging: process.env.NODE_ENV === 'development',
    cli: {
      entitiesDir: './src/**',
      migrationsDir: './src/migrations',
    },
    namingStrategy: new CustomNamingStrategy(),
    bigNumberStrings: false,
    autoLoadEntities: process.env.NODE_ENV === 'test',
  },
});

export default ormconfig().database;
