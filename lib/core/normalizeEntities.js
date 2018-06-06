'use strict'

const entityIsValid   = require('./entityIsValid')
const normalizeEntity = require('./normalizeEntity')
const deepClone       = require('../utils/deepClone')

function normalizeEntities (entities) {

  entities = (

    // no data
    (typeof entities === 'undefined' || entities == null || entities === "" || entities === 0)
    ? []

    // if parser returned an empty object
    : (typeof entities === 'object' && Object.keys(entities).length == 0)
    ? []

    // valid array
    : Array.isArray(entities)
    ? entities

    // lone object that needs to be wrapped in a result array
    : [entities]
  )


  // filter bad entities
  return entities.reduce((acc, entity) => {
    if (entityIsValid(entity)) {
      const normalized = normalizeEntity(entity)
      if (entityIsValid(normalized)) {
        acc.push(deepClone(normalized))
      }
    }
    return acc
  }, [])
}


module.exports = normalizeEntities
