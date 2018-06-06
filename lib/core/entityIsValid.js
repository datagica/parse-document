'use strict'

const isDefined = require('../utils/isDefined')

function entityIsValid (entity) {
  return isDefined(entity) && entity !== null && entity !== {} && entity !== ''
}

module.exports = entityIsValid
