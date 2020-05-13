import { Injectable, UnauthorizedException } from '@nestjs/common'
import { hash } from 'bcrypt'
//
import { UserService } from '../users/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username)
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
