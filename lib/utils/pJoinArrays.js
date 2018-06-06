'use strict'

// promise to join arrays
function pJoinArrays (arrays) {
  return Promise.resolve(
    arrays.reduce((acc, arr) => acc.concat(arr), [])
  )
}

module.exports = pJoinArrays
