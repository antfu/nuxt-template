import merge from 'deepmerge'

import DefaultConfig from './customize.default'
import UserConfig from './customize.user'

export default merge(DefaultConfig, UserConfig)
