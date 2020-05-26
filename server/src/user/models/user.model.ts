import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { SubscriptionType } from '@prisma/client'

@ObjectType()
export class User {
  id: string
  username: string
  @Field(_type => SubscriptionType)
  subscription_type: SubscriptionType
}

// enum SubscriptionType {
//   FREE_TIER = 'FREE_TIER',
//   PREMIUM_SUBSCRIBER = 'PREMIUM_SUBSCRIBER',
//   ENTERPRISE_SUBSCRIBER = 'ENTERPRISE_SUBSCRIBER',
// }

registerEnumType(SubscriptionType, {
  name: 'SubscriptionType',
  description: 'Type of subscription account is associated with.',
})
