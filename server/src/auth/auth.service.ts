import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { hash } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username)
    if (!user) throw new UnauthorizedException()
    const hashedPassword = await hash(password, user.salt)
    if (user?.password === hashedPassword) {
      const { password, salt, ...result } = user
      return {
        id: result.id,
      }
    }
    return null
  }
}
