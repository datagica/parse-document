'use strict'

function promisify (input) {
  const strOutput = input.toString()
  const isPromise = strOutput === '[object Promise]'
  return isPromise ? input : Promise.resolve(input)
}

module.exports = promisify
