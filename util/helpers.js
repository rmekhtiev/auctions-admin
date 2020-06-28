import get from 'lodash.get'

export function deepFind(object, path, defaultValue) {
  return get(object, path, defaultValue)
}

export function removeStringPrefix(str, prefix) {
  const hasPrefix = str.indexOf(prefix) === 0
  return hasPrefix ? str.substr(prefix.length) : str.toString()
}
