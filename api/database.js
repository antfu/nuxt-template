import mongoose from 'mongoose'
import logger from './logger'
import configs from '../configs/server'

let connected = false
let retry_counter = configs.mongodb.retry_counter
const retry_timout = configs.mongodb.retry_timeout
const retry = configs.mongodb.retry

const mongo_config = configs.mongodb.config || {}

mongoose.Promise = global.Promise
try {
  mongoose.connect(configs.mongodb.url, mongo_config)
}
catch (err) {
  throw err
}

mongoose.connection
  .on('connected', () => {
    logger.info('Mongoose connected')
    // Reset retry counter
    connected = true
    retry_counter = configs.mongodb.retry_counter
  })
  .on('error', err => {
    logger.error(`Mongoose error : ${err}`)
    mongoose.disconnect()
  })
  .on('disconnected', () => {
    logger.info('Mongoose disconnected')
    // Reconnect
    connected = false
    retry_counter--
    if (retry && retry_counter > 0) {
      setTimeout(() => {
        mongoose.connect(configs.mongodb.url, mongo_config)
      }, retry_timout)
    }
  })

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0)
  })
})

export function isConnected () {
  return connected
}

export default mongoose.connection
