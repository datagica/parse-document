'use strict'

function deepClone (input) {
  return JSON.parse(JSON.stringify(input))
}

module.exports = deepClone
