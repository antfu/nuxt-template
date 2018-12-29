/* eslint-disable no-extend-native */
if (!('toJSON' in Error.prototype)) {
  Object.defineProperty(Error.prototype, 'toJSON', {
    value () {
      const alt = {}
      Object.getOwnPropertyNames(this).forEach(function (key) {
        alt[key] = this[key]
      }, this)
      return alt
    },
    configurable: true,
    writable: true,
  })
}
