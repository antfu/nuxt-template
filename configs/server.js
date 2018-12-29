import merge from 'deepmerge'

import DefaultConfig from './server.default'
import UserConfig from './server.user'

const configs = merge(DefaultConfig, UserConfig)

const mongodb_auth = (configs.mongodb.username && configs.mongodb.password) ? `${configs.mongodb.username}:${configs.mongodb.password}@` : ''
configs.mongodb.url = `mongodb://${mongodb_auth}${configs.mongodb.host}:${configs.mongodb.port}/${configs.mongodb.db}?authSource=admin`

export default configs
