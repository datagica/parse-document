'use strict'

function pAssign (a, b, c, d) {
  return Promise.resolve(
    Object.assign(a, b, c, d)
  )
}

module.exports = pAssign
