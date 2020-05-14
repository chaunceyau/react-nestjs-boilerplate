import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class LocalConfigService {
  constructor(private configService: ConfigService) {}

  /**
   * @returns e.g. http://localhost:3000
   */
  get corsOrigin() {
    return this.configService.get('FRONTEND_URL')
  }

  /**
   * @returns randomly generated string
   */
  get cookieSigningKey() {
    return this.configService.get('COOKIE_SIGNING_SECRET')
  }

  /**
   * @returns e.g. 1000 * 60 * 60 * 30 * 24
   */
  get cookieMaxAge() {
    return this.configService.get('COOKIE_MAX_AGE')
  }
}
