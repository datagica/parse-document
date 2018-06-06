'use strict'

const isDefined = require('./isDefined')
const isString = require('./isString')

const getEntityIdAndTypeFromValue = require('./getEntityIdAndTypeFromValue')

function getEntityIdAndType (input, defaultType = 'generic') {

  // console.log("getEntityIdAndType: ", JSON.stringify({ input, defaultType }, null, 2))

  if (input instanceof Object) {

    // console.log("getEntityIdAndType: input is an object")

    if (Array.isArray(input)) {

      // console.log("getEntityIdAndType: input is an array")

      return {
        type: defaultType,
        id: 'undefined'
      }
    }

    // in case we have a nested object
    input = isDefined(input.entity) ? input.entity : input

    if (typeof input.type === 'string') {

      // console.log("getEntityIdAndType: input.type is a string")

      return getEntityIdAndTypeFromValue(input.type, defaultType)
    } else if (typeof input.id === 'string') {

      // console.log("getEntityIdAndType: input.id is a string")

      return getEntityIdAndTypeFromValue(input.id, defaultType)
    } else {

      // console.log("getEntityIdAndType: input as no type or id")

      return {
        type: defaultType,
        id: 'undefined'
      }
    }
  } else {

    // console.log("getEntityIdAndType: input is not an object")

    return getEntityIdAndTypeFromValue(input, defaultType)
  }
}

module.exports = getEntityIdAndType
