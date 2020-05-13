import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  id: string
  username: string
}
