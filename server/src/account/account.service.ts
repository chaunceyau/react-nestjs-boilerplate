import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { genSalt, hash } from 'bcrypt'
import * as cuid from 'cuid'
//
import { PrismaService } from '../prisma/prisma.service'
import { User } from '../user/models/user.model'

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async createAccount(username: string, password: string): Promise<User> {
    const { password: hashedPassword, salt } = await this.hashPassword(password)
    try {
      const {
        password,
        salt: _salt,
        ...result
      } = await this.prisma.user.create({
        data: { id: cuid(), username, password: hashedPassword, salt },
      })
      return result
    } catch (err) {
      throw new BadRequestException(
        'Failed creating account, account already exists.'
      )
    }
  }

  async changePassword(
    id: string,
    originalPassword: string,
    newPassword: string
  ) {
    try {
      const user = await this.prisma.user.findOne({
        where: { id },
      })
      const { password: hashedOriginalPassword } = await this.hashPassword(
        originalPassword,
        user.salt
      )
      if (hashedOriginalPassword !== user.password)
        throw new UnauthorizedException('Original password incorrect.')
      //
      const {
        password: hashedNewPassword,
        salt: newSalt,
      } = await this.hashPassword(newPassword)

      await this.prisma.user.update({
        where: { id },
        data: {
          password: hashedNewPassword,
          salt: newSalt,
        },
      })
    } catch (err) {
      throw new BadRequestException('Failed changing password.')
    }
  }

  async hashPassword(
    password: string,
    salt?: string
  ): Promise<{
    password: string
    salt: string
  }> {
    if (salt) {
      const hashedPassword = await hash(password, salt)
      return { salt, password: hashedPassword }
    } else {
      const generatedSalt = await genSalt(10)
      const hashedPassword = await hash(password, generatedSalt)
      return { salt: generatedSalt, password: hashedPassword }
    }
  }
}
