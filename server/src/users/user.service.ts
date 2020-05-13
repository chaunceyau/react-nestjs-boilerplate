import { Injectable } from '@nestjs/common'

export type User = any

@Injectable()
export class UserService {
  private readonly users: User[]

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'john',
        // password: 'changeme',
        password:
          '$2b$10$XVjQDiTx3VIYH80fp8zJ5OF9F9k/CV46BnOgd8dgh570cWmOT4PL6',
        salt: '$2b$10$XVjQDiTx3VIYH80fp8zJ5O',
      },
      {
        id: 2,
        username: 'chris',
        // password: 'secret',
        password:
          '$2b$10$PsxOx10i/Mb/dzBb6kG7L.sjugKRv7/vmQBW2GuGsIpPALWhUcRp2',
        salt: '$2b$10$PsxOx10i/Mb/dzBb6kG7L.',
      },
      {
        id: 3,
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
        const { password, salt, ...result } = this.users.find(
          user => user.username === username
        )
        resolve(result)
      }, 250)
    })
  }

  async findOneById(id: number): Promise<User | undefined> {
    // simulate a network call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { password, salt, ...result } = this.users.find(
          user => user.id === id
        )
        resolve(result)
      }, 250)
    })
  }
}
