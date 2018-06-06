'use strict'

function allSeq (promises) {
  return promises.reduce((previous, current) => (
    previous.then(results =>
      current.then(result => Promise.resolve(results.concat(result)))
             .catch(err   => (console.error("ignored error: "+err), previous))
    )
  ), Promise.resolve([]))
}

module.exports = allSeq
