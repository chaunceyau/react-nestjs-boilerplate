import { Injectable } from '@nestjs/common'

export type User = any

@Injectable()
export class UsersService {
  private readonly users: User[]

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        // password: 'changeme',
        password:
        '$2b$10$XVjQDiTx3VIYH80fp8zJ5OF9F9k/CV46BnOgd8dgh570cWmOT4PL6',
        salt: '$2b$10$XVjQDiTx3VIYH80fp8zJ5O',
      },
      {
        userId: 2,
        username: 'chris',
        // password: 'secret',
        password:
        '$2b$10$PsxOx10i/Mb/dzBb6kG7L.sjugKRv7/vmQBW2GuGsIpPALWhUcRp2',
        salt: '$2b$10$PsxOx10i/Mb/dzBb6kG7L.',
      },
      {
        userId: 3,
        username: 'maria',
        // password: 'guess',
        password:
          '$2b$10$GhRLbHbSQgz2eIwv2CBm4eIJYCYyCKLMo.A6oZ8fOAB5knBxQA6tm',
        salt: '$2b$10$GhRLbHbSQgz2eIwv2CBm4e',
      },
    ]
  }

  async findByUsername(username: string): Promise<User | undefined> {
    // simulate a network call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users.find((user) => user.username === username))
      }, 250)
    })
  }

  async findById(id: string): Promise<User | undefined> {
    // simulate a network call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users.find((user) => user.userId === id))
      }, 250)
    })
  }
}
