import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
//
import { AuthService } from './auth.service'
import { LocalStrategy } from './util/local.strategy'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { SessionSerializer } from './util/session.serializer'
import { PrismaModule } from '../prisma/prisma.module'
import { AccountService } from '../account/account.service'

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [AuthService, AccountService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
