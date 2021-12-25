module.exports = {
  type: 'sqlite',
  database: 'db/reading_management.sqlite3',
  entities: ['./dist/**/*.entity{.ts,.js}'],
  migrations: ['./dist/src/migrations/*{.ts,.js}'],
  synchronize: 'false',
  logging: true,
  cli: {
    entitiesDir: './dist/src',
    migrationsDir: './src/migrations',
  },
};
