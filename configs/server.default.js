export default {
  log_dir: './logs',
  mongodb: {
    db: 'test',
    host: '127.0.0.1',
    port: 27017,
    username: null,
    password: null,
    retry: true,
    retry_counter: 100,
    retry_timeout: 200,
    config: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
  session: {
    secret: '0000',
    max_age: 1000 * 60 * 15, // 15min,
    max_age_keep: 1000 * 60 * 60 * 24 * 3, // 3days,
  },
}
