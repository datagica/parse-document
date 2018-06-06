'use strict'

const isString = require('./isString')

function getEntityIdAndTypeFromValue (input, defaultType) {
  if (!isString(input)) {

    // console.log("getEntityIdAndTypeFromValue: input is not a string: ", JSON.stringify(input, null, 2))

    return {
      type: defaultType,
      id: 'undefined'
    }
  }

  // remove the prefixed meta-type ("entity:******")
  const existingMetaType = input.split(':')
  if (existingMetaType.length === 2) {
    // console.log("getEntityIdAndTypeFromValue: input has a type: ", JSON.stringify(existingMetaType, null, 2))
    input = existingMetaType[1]
  }

  const existingType = input.split('__')
  if (existingType.length === 2) {

    // console.log("getEntityIdAndTypeFromValue: input has a sub-type: ", JSON.stringify(existingType, null, 2))

    return {
      type: existingType[0],
      id: existingType[1]
    }
  }

  // console.log("getEntityIdAndTypeFromValue: input is just an id.. it seems.. ")

  return {
    type: defaultType,
    id: input
  }
}

module.exports = getEntityIdAndTypeFromValue
