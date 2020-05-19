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

  /**
   *
   * @param username user's email address
   * @param rawPassword provided plaintext/unhashed password
   */
  async validateUser(username: string, rawPassword: string): Promise<any> {
    const user = await this.prisma.user.findOne({ where: { username } })
    
    if (!user) throw new UnauthorizedException()

    const { password, salt, ...result } = user
    const { password: hashedPassword } = await this.accountService.hashPassword(
      rawPassword,
      salt
    )
    
    return password === hashedPassword ? result : null
  }
}
