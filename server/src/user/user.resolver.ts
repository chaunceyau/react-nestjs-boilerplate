import { Resolver, Query, Args } from '@nestjs/graphql'
import { UseGuards, NotFoundException } from '@nestjs/common'
//
import { User } from './models/user.model'
import { UserService } from './user.service'
import { GraphQLAuthenticatedGuard } from '../common/guards/authenticated.guard'
import { GraphQLUser } from '../common/decorators/user.decorator'

@Resolver(_of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GraphQLAuthenticatedGuard)
  @Query(_returns => User)
  async user(@Args('id') id: string) {
    return this.userService.findOneById(id)
  }
  
  @UseGuards(GraphQLAuthenticatedGuard)
  @Query(_returns => User)
  async currentUser(@GraphQLUser() user) {
    try {
      const currentUser = await this.userService.findOneById(user.id)
      return currentUser
    } catch (err) {
      throw new NotFoundException('Not user found with this ID.')
    }
  }
}
