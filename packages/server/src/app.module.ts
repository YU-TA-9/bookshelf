import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ormconfig } from './configs/ormconfig';
import { HealthzModule } from './healthz/healthz.module';

@Module({
  imports: [
    forwardRef(() =>
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: process.env.NODE_ENV === 'production' ? '' : '.env',
        ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
        load: [ormconfig],
      }),
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('database');
      },
    }),
    HealthzModule,
    AuthModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
