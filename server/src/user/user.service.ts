import { Injectable, NotFoundException } from '@nestjs/common'
//
import { PrismaService } from '../prisma/prisma.service'
import { User } from './models/user.model'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // potentially dangerous - shows existence of an account...
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findOne({
      where: { username },
    })
    if (!user) throw new NotFoundException()
    const { password, salt, ...result } = user
    return result
  }

  async findOneById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findOne({
      where: { id },
    })
    if (!user) throw new NotFoundException()
    const { password, salt, ...result } = user
    return result
  }
}
