import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(type => Int)
  id: number
  username?: string
}
