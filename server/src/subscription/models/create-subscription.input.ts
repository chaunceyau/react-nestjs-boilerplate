import { Field, ObjectType, InputType, registerEnumType } from '@nestjs/graphql'

@InputType()
export class CreateSubscriptionInput {
  @Field(type => String)
  plan: PremiumPlanType
  // @Field(type => String)
  // payment_method_id: string
}

@ObjectType()
export class CreateSubscriptionResponse {
  @Field(type => Boolean)
  success: boolean
}

export enum PremiumPlanType {
  PREMIUM_MONTHLY = 'PREMIUM_ANNUAL',
  PREMIUM_ANNUAL = 'PREMIUM_ANNUAL',
}

registerEnumType(PremiumPlanType, {
  name: 'SubscriptionPlan',
})
