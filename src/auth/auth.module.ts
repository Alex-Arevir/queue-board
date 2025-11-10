import { Inject, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { register } from 'module';
import { config } from 'dotenv';


@Module({
  imports: [
    ConfigModule, forRoot({isGlobal : true}),
    JwtModule, registerAsync({
      imports: [ConfigModule],
      Inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret : config.get<string>('JWS_SECRET'),
        signOptions: {expiresIn: config.get<string> ('JWS_EXPIRES_IN')},

      }),
    }),
  ],
  controllers: [AuthController],
  providers : [AuthService, PrismaService],
  exports : [AuthService],
})
export class AuthModule {}

