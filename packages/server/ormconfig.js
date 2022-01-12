module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 13306,
  username: 'root',
  password: 'root',
  database: 'reading_management',
  entities: ['./dist/**/*.entity{.ts,.js}'],
  migrations: ['./dist/src/migrations/*{.ts,.js}'],
  synchronize: 'false',
  connectTimeout: 30 * 1000,
  logging: true,
  cli: {
    entitiesDir: './dist/src',
    migrationsDir: './src/migrations',
  },
};

//sqlite
//{
// type: 'sqlite',
//  database: 'db/reading_management.sqlite3',
//  entities: ['./dist/**/*.entity{.ts,.js}'],
//  migrations: ['./dist/src/migrations/*{.ts,.js}'],
//  synchronize: 'false',
//  logging: true,
// cli: {
//    entitiesDir: './dist/src',
//    migrationsDir: './src/migrations',
//  },
//};
