'use strict'

function makeRecordFromInput (input) {
  return {
    type       : 'record',
    id         : `record:${input.sourceId}__${input.uri}`,
    bundleId   : input.bundleId,
    templateId : input.templateId,
    sourceId   : input.sourceId,
    date       : input.date && input.date.lastChanged ? input.date.lastChanged : new Date(),
    uri        : input.uri,
    hash       : input.hash,
    label      : { en: input.name },
    indexed    : input.text,
    properties : {}, // for abstract properties, such has document language, category..
    links      : [] // the links
  }
}

module.exports = makeRecordFromInput
