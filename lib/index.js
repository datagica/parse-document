'use strict'

const parsePatterns = require('@datagica/parse-patterns')
const unambiguate   = require('@datagica/unambiguate')
const tokenize      = require('@datagica/tokenize')()

const createMention       = require('./core/createMention')
const extractEntities     = require('./core/extractEntities')
const makeRecordFromInput = require('./core/makeRecordFromInput')

const allSeq        = require('./utils/allSeq')
const isDefined     = require('./utils/isDefined')
const pJoinArrays   = require('./utils/pJoinArrays')
const deepClone     = require('./utils/deepClone')
const promisify     = require('./utils/promisify')
const getEntityIdAndType = require('./utils/getEntityIdAndType')

class ParseDocument {

  constructor (opts) {
    this.type = opts.type
    this.properties = isDefined(opts.properties) ? opts.properties : {}
    this.entities   = isDefined(opts.entities)   ? opts.entities   : {}
  }

  /**
   * input must be an object
   *
   * @param input: Object
   *   @param bundleId: String
   *   @param templateId: String
   *   @param sourceId: String
   *   @param name: String   - name
   *   @param text: String   - unformatted text content (can be thus quite different from original PDF text)
   *   @param uri: String    - uri of the record
   *   @param hash: String   - hash of the file's content
   *   @param date: Object
   *     @param lastChanged: Date  - last changed date for the document
   *     @param elapsed: Number
   *
   */
  async parse (input) {

    const record = makeRecordFromInput(input)

    const algorithm = async ({ sentence, positions, results }) => {
      // console.log("algorithm: "+JSON.stringify({ sentence, positions, results }, null, 2))

      const entityTypesList = Object.keys(this.entities)
      const singleEntitiesList = []

      for (let i = 0; i < entityTypesList.length; i++) {
        const entityType = entityTypesList[i]

        const parser = this.entities[entityType]

        /*
        console.log(`  plugin "${entityType}" => ${JSON.stringify({
          entityType: entityType,
          parser: parser,
          type: typeof parser,
          keys: Object.keys(this.entities)
        }, null, 2)}`)
        */

        let lastCharForThisEntityType = positions.character

        // return a promise of a list of entities
        const rawEntities = await extractEntities(sentence, parser)
        
        for (let j = 0; j < rawEntities.length; j++) {
          const entity = rawEntities[j]
          if (!entity) {
            console.error('entity container is invalid: ' + JSON.stringify(entity, null, 2))
            continue
          }
          if (entity.position) {
            entity.position.sentence += positions.sentence
            entity.position.word     += positions.word
            entity.position.begin    += lastCharForThisEntityType
            entity.position.end      += lastCharForThisEntityType
            //lastCharForThisEntityType = entity.position.end
          } else {
            // console.error('entity container has no sub-field position: ' + JSON.stringify(entity, null, 2))
            entity.position = {
              sentence: positions.sentence,
              word    : positions.word,

              // note: we should check that using a large length
              // doesn't make it take priority over other entities
              begin   : lastCharForThisEntityType,
              end     : lastCharForThisEntityType, // TODO use entity length
            }
          }
          if (entity.entity) {
            const { type, id } = getEntityIdAndType(entity.entity, entityType)
            entity.entity.id = `entity:${type}__${id}`
          } else {
            console.error('entity container has no sub-field entity: ' + JSON.stringify(entity, null, 2))
            continue
          }
          singleEntitiesList.push(entity)
 
        }

        const ranking = unambiguate(singleEntitiesList, sentence)

        const firstAdded = {}
        singleEntitiesList.forEach(entity => {
          const singleMention = createMention(record, entity)
          if (singleMention) {
            record.links.push(singleMention)
            // console.log("firstAdding: "+entity.entity.id)
            firstAdded[entity.entity.id] = singleMention.target
          }
        })

        const compositeEntities = deepClone(await parsePatterns(sentence, singleEntitiesList))

        // console.log("compositeEntities: "+JSON.stringify(compositeEntities, null, 2))

        // then we add the patterns
        compositeEntities.map(({ source, link, target }) => {

          if (source === null || target === null || link === null) {
            // console.error("skipping an incomplete entity..")
            return
          }

          // composite entities also counts as classic mentions
          // however, we should be careful to not count them twice..

          const sourceTypeLink = createMention(record, source)
          if (sourceTypeLink) {
            // console.log("trying to push source to record links")
            // console.log("checking: "+source.entity.id)
            if (!firstAdded[source.entity.id]) {
              // console.log(" => okay to push source to record links")
              record.links.push(sourceTypeLink)
              firstAdded[source.entity.id] = sourceTypeLink.target
            } else {
              // console.log(" => already added")
            }
          }

          const targetTypeLink = createMention(record, target)
          if (targetTypeLink) {
            // console.log("trying to push target to record links")
            // console.log("checking: "+target.entity.id)
            if (!firstAdded[target.entity.id]) {
              // console.log(" => okay to push target to record links")
              record.links.push(targetTypeLink)
              firstAdded[target.entity.id] = targetTypeLink.target
            } else {
              // console.log(" => already added")
            }
          }

          // we only support complete A-->B for now
          // but later we should also support partial links using an
          // "undefined" source or target
          if (sourceTypeLink && targetTypeLink && link) {
            const sourceNode = firstAdded[source.entity.id]
            const targetNode = firstAdded[target.entity.id]
            if (sourceNode && targetNode) {
              // console.log("found the source node!")
              sourceNode.links.push({
                link:       link,
                properties: {},
                target:     targetNode
              })
            } else {
              // console.error("couldn't find the source node, skipping..")
            }
          }
        })
      }
    }

    await allSeq(tokenize(record.indexed, algorithm, []))
    return record
  }
}

module.exports = ParseDocument
module.default = ParseDocument
