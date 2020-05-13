import { NestFactory } from '@nestjs/core'
import { createClient } from 'redis'
//
import * as passport from 'passport'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
//
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
//

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  })
  const RedisStore = connectRedis(session)
  const redisClient = createClient()
  // app.set('trust proxy', 1) // trust first proxy
  app.use(
    session({
      name: 'connect.sid',
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // fix
        httpOnly: false, // fix
        // sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 30 * 24,
      },
      store: new RedisStore({ client: redisClient }),
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(5000)
}

bootstrap()
