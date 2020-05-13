import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class LocalConfigService {
  constructor(private configService: ConfigService) {}

  /**
   * @returns e.g. http://localhost:3000
   */
  get getCorsOrigin() {
    return this.configService.get('FRONTEND_URL')
  }

  /**
   * @returns randomly generated string
   */
  get getCookieSigningKey() {
    return this.configService.get('COOKIE_SIGNING_SECRET')
  }
}
