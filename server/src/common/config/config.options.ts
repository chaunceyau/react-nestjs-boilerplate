import * as Joi from '@hapi/joi'
//
import configuration from './global.config'

export default {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    PORT: Joi.number().default(5000),
    DATABASE_URL: Joi.string().required(),
    COOKIE_SIGNING_SECRET: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),
  }),
  load: [configuration],
}
