import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('home')
  home() {
    return `<html><h1>lololol</h1></html>`
  }
}
