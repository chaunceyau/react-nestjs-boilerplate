import { Module } from '@nestjs/common'
// 
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { PrismaModule } from '../prisma/prisma.module'
import { UserService } from '../user/user.service'

@Module({
  imports: [PrismaModule],
  providers: [AccountService, UserService],
  controllers: [AccountController],
})
export class AccountModule {}
