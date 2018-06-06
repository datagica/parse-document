'use strict'

const Entity = require('@datagica/entity')

function normalizeEntity (entity) {

  // has the entity coordinates?
  // console.log("ENTITY ==> "+JSON.stringify(entity, null, 2))
  const isNGram = typeof entity.ngram === 'string'

  const normalized = isNGram ? Entity(entity.value) : Entity(entity)
  // console.log("normalized ==> "+JSON.stringify(normalized, null, 2))

  if (!normalized) {
    return null
  }

  return {
    position: isNGram ? Object.assign({
      ngram: entity.ngram,
      score: entity.score
    }, entity.position) : null,
    entity: normalized.value ? normalized.value : normalized
  }
}

module.exports = normalizeEntity
