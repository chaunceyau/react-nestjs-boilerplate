import Stripe from 'stripe'
import { InjectStripe } from 'nestjs-stripe'
import { Controller, Response, Get, UseGuards } from '@nestjs/common'
//
import { PrismaService } from '../prisma/prisma.service'
import { SubscriptionService } from './subscription.service'
import { RESTUser } from '../common/decorators/user.decorator'
import { RESTAuthenticatedGuard } from '../common/guards/authenticated.guard'

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionService
  ) {}

  @UseGuards(RESTAuthenticatedGuard)
  @Get()
  async redirectToBillingPortalSession(@RESTUser() user, @Response() res) {
    const db_user = await this.prisma.user.findOne({
      where: { id: user.id },
      select: { stripe_info: true },
    })

    const url = await this.subscriptionService.createBillingPortalSession({
      customer_id: db_user.stripe_info.customer_id,
    })

    res.redirect(url)
  }
}
