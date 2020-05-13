import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [AccountService],
})
export class AccountModule {}
