import { Resolver, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
//
import { User } from './models/user.model'
import { UserService } from './user.service'
import { GraphQLAuthenticatedGuard } from '../common/guards/authenticated.guard'

@Resolver(_of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GraphQLAuthenticatedGuard)
  @Query(_returns => User)
  async user(@Args('id') id: string) {
    return this.userService.findOneById(id)
  }
}
