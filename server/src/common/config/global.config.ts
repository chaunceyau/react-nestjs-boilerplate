export default () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  COOKIE_SIGNING_SECRET: process.env.COOKIE_SIGNING_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV,
  COOKIE_MAX_AGE: 1000 * 60 * 60 * 30 * 24,
})
