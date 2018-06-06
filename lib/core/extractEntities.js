'use strict'

const normalizeEntities = require('./normalizeEntities')
const promisify = require('../utils/promisify')

function extractEntities (sentence, parser) {
  // console.log("extractEntities: sentence: "+sentence)
  try {
    return promisify(parser(sentence))
    .then(entities => {
      // console.log("extractEntities: raw results: "+JSON.stringify(entities, null, 2))
      return promisify(normalizeEntities(entities))
    }).catch(err => {
      console.error("extractEntities: couldn't find anything: "+err)
      return promisify([])
    })
  } catch (exc) {
    console.error("extractEntities: cannot parse entities, parser failed: "+ exc)
    return promisify([])
  }
}

module.exports = extractEntities
