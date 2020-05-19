import { Module } from '@nestjs/common'
// 
import { PrismaModule } from '../prisma/prisma.module'
import { SubscriptionService } from './subscription.service'
import { SubscriptionResolver } from './subscription.resolver'
import { LocalConfigModule } from '../config/config.module'

@Module({
  imports: [PrismaModule, LocalConfigModule],
  providers: [SubscriptionService, SubscriptionResolver],
})
export class SubscriptionModule {}
