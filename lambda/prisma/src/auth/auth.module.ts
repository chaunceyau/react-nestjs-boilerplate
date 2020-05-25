import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'
//
import { AuthService } from './auth.service'
import { LocalStrategy } from './passport/local.strategy'
import { UsersModule } from '../users/users.module'
// import { jwtConstants } from './constants';
import { AuthController } from './auth.controller'
import { SessionSerializer } from './session.serializer'
// import { UsersService } from '../users/users.service'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    // JwtModule.register({
    //   secret: 'jwtConstants.secret',
    //   signOptions: { expiresIn: '1hr' },
    // }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
