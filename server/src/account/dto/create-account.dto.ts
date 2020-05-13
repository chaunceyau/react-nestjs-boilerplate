import { IsEmail, Length } from 'class-validator'

export class CreateAccountDto {
  @IsEmail()
  @Length(4)
  username: string
  @Length(6)
  password: string
}
