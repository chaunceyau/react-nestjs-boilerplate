import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GraphQLError } from 'graphql'
//
import { stripeDateToISO } from '../common/utils'
import {
  CreateSubscriptionInput,
  CreateSubscriptionResponse,
} from './models/create-subscription.input'
import {
  GraphQLUser,
  ResponseObjectUser,
} from '../common/decorators/user.decorator'
import { PrismaService } from '../prisma/prisma.service'
import { SubscriptionService } from './subscription.service'
import { GraphQLAuthenticatedGuard } from '../common/guards/authenticated.guard'

@Resolver('Subscription')
export class SubscriptionResolver {
  constructor(
    private prisma: PrismaService,
    private subscriptionService: SubscriptionService
  ) {}

  @UseGuards(GraphQLAuthenticatedGuard)
  @Mutation(_returns => CreateSubscriptionResponse)
  async upgradeToPremium(
    @Args('input') { plan }: CreateSubscriptionInput,
    @GraphQLUser() user: ResponseObjectUser
  ): Promise<CreateSubscriptionResponse> {
    const db_user = await this.prisma.user.findOne({
      where: { id: user.id },
      select: {
        stripe_info: true,
      },
    })

    if (db_user?.stripe_info?.subscription_id)
      throw new GraphQLError('Subscription already exists for this user.')
    // if (db_user?.stripe_info?.subscription_id)
    //   throw new GraphQLError('Subscription already exists for this user.')

    try {
      const subscription = await this.subscriptionService.createSubscription({
        customer_id: db_user.stripe_info.customer_id,
        payment_method_id: db_user.stripe_info.payment_method_id,
        price_id: this.subscriptionService.getPriceIdForPremiumPlan(plan),
      })

      if (!subscription) {
        throw new GraphQLError('Failed creating subscription.')
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          subscription_type: 'PREMIUM_SUBSCRIBER',
          stripe_info: {
            update: {
              subscription_id: subscription.id,
            },
          },
          current_period_end: stripeDateToISO(subscription.current_period_end),
        },
      })

      return {
        success: true,
      }
    } catch (err) {
      console.log('HERE')
      throw new GraphQLError('Failed creating subscription.')
    }
  }
}
