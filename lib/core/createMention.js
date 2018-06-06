'use strict'

const CoreConcepts       = require('@datagica/core-concepts')
const isDefined          = require('../utils/isDefined')
const getEntityIdAndType = require('../utils/getEntityIdAndType')

const { LINK_MENTION, LINK_INSTANCEOF } = require('../core/definitions')
const setInstanceOf = require('../core/setInstanceOf')

function createMention (record, entity) {

  // NOTE special entities that are just properties of the record
  // for instance, a date, an author, url etc.. is a property
  /*
  if (!entity.position) {
    console.log("ENTITY IS A PROPERTY: " + JSON.stringify(entity, null, 2))
    if (!isDefined(record.properties[entityType])) {
      record.properties[entityType] = []
    }
    record.properties[entityType].push(entity.entity)
    return
  }
  */

  // TODO row.entity.value will be renamed to row.entity.properties
  // well, someday..


  const entityObject = isDefined(entity) && isDefined(entity.entity) ? entity.entity : {}
  const position = isDefined(entity) && isDefined(entity.position) ? entity.position : {}

  const mentionLinkProperties = Object.assign({}, position)

  const values =
    isDefined(entityObject.value)
      ? entityObject.value
      : isDefined(entityObject.properties)
        ? entityObject.properties
        : entityObject

  // okay, so we need to sort our data between common/shared meta data
  // and data specific to the current entity (aka "entity properties")
  const isMetaKeyAndNotProperty = {
    type       : true,
    id         : true,
    label      : true,
    description: true,
    aliases    : true
  }

  const mentionLinkTarget = {
    properties: {},
    links     : []
  }

  Object.keys(values).map(key => {
    if (key === 'properties') {
      throw new Error("forbidden to define a key with value 'properties' in a group of properties.. use a better name!")
    }
    if (key === 'links') {
      throw new Error("forbidden to define a key with value 'links' in a group of properties.. use a better name!")
    }

    if (isMetaKeyAndNotProperty[key]) {
      mentionLinkTarget[key] = values[key]
    } else {
      mentionLinkTarget.properties[key] = values[key]
    }
  })

  setInstanceOf(mentionLinkTarget, getEntityIdAndType(entity))

  return {
    link:       LINK_MENTION,
    properties: mentionLinkProperties,
    target:     mentionLinkTarget
  }
}

module.exports = createMention
