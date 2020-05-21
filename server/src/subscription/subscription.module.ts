import { Module } from '@nestjs/common'
//
import { PrismaModule } from '../prisma/prisma.module'
import { SubscriptionService } from './subscription.service'
import { SubscriptionResolver } from './subscription.resolver'
import { LocalConfigModule } from '../config/config.module'
import { SubscriptionController } from './subscription.controller'

@Module({
  imports: [PrismaModule, LocalConfigModule],
  providers: [SubscriptionService, SubscriptionResolver],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
