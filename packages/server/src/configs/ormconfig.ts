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
    database: 'bookshelf',
    entities: ['./dist/**/*.entity{.ts,.js}'],
    migrations: ['./dist/**/migrations/*{.ts,.js}'],
    synchronize: false,
    connectTimeout: 30 * 1000,
    logging: true,
    cli: {
      entitiesDir: './src/**',
      migrationsDir: './src/migrations',
    },
  },
});

export default ormconfig().database;
