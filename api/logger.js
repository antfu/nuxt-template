import winston from 'winston'
import fs from 'fs'
import dayjs from 'dayjs'
import configs from '../configs/server'

const log_dir = configs.log_dir
const today = dayjs().format('YYYY-MM-DD')
const month = dayjs().format('YYYY-MM')

if (!fs.existsSync(log_dir))
  fs.mkdirSync(log_dir)

const myFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    myFormat
  ),
  transports: [
    new (winston.transports.File)({
      level: 'debug',
      name: 'info-file',
      filename: `${log_dir}/log-info-${today}.log`,
    }),
    new (winston.transports.File)({
      level: 'error',
      name: 'error-file',
      filename: `${log_dir}/log-error-${month}.log`,
      humanReadableUnhandledException: true,
      handleExceptions: true,
    }),
  ],
})

logger.level = process.env.LOG_LEVEL

export default logger
