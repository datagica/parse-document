'use strict'

const CoreConcepts = require('@datagica/core-concepts')

const { LINK_MENTION, LINK_INSTANCEOF } = require('../core/definitions')

const log = require('../utils/log')

function setInstanceOf (mentionLinkTarget, typeId) {

  const { type, id } = typeId

  // log("  - setInstanceOf of typeId ", { type, id })

  if (!(mentionLinkTarget instanceof Object)) {
    mentionLinkTarget = {}
  }

  // this is the "meta-type" (always entity)
  mentionLinkTarget.type = 'entity'

  mentionLinkTarget.id = `${mentionLinkTarget.type}:${type}__${id}`

  // log("final id: ",  mentionLinkTarget.id)

  if (!Array.isArray(mentionLinkTarget.links)) {
    mentionLinkTarget.links = []
  }

  const instanceofTarget = CoreConcepts.get(`${mentionLinkTarget.type}:${type}`)
  if (instanceofTarget) {

    mentionLinkTarget.links.push({
      link: LINK_INSTANCEOF,

      properties: {}, // nothing here yet

      target: instanceofTarget // parent type
    })
  }

  return mentionLinkTarget
}

module.exports = setInstanceOf
