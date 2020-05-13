import { Injectable, UnauthorizedException } from '@nestjs/common'
//
import { PrismaService } from '../prisma/prisma.service'
import { AccountService } from '../account/account.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private accountService: AccountService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findOne({ where: { username } })
    if (!user) throw new UnauthorizedException()
    const { password: hashedPassword } = await this.accountService.hashPassword(
      password,
      user.salt
    )
    if (user?.password === hashedPassword) {
      const { password, salt, ...result } = user
      return {
        id: result.id,
      }
    }
    return null
  }
}
