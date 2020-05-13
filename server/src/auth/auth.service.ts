import { hash } from 'bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
//
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findOne({ where: { username } })
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
