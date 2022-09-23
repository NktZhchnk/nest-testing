import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';
import { ItemsModule } from './modules/items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsEntity } from './modules/items/items.entity';
import { UsersEntity } from './modules/users/users.entity';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ ConfigService ],
      useFactory(configService: ConfigService){
        return {
          type: 'mysql',
          host: configService.get('DB.HOST'),
          port: configService.get('DB.PORT'),
          username: configService.get('DB.USERNAME'),
          password: configService.get('DB.PASSWORD'),
          database: configService.get('DB.DATABASE'),
          entities: [ItemsEntity, UsersEntity],
          synchronize: true,
        };
      },
    }),
    AuthModule,
    ItemsModule,
    UsersModule,
    EventsModule,
  ],
})
export class AppModule {}
