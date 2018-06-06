'use strict'

const chai = require('chai')
chai.use(require('chai-fuzzy'))
const expect = chai.expect

// some test parsers
const parseEmails    = require("@datagica/parse-emails")
const parseInterests = require("@datagica/parse-interests")
const parseAnimals   = require("@datagica/parse-generic-animals")
const ParseDocument  = require("../lib/index")

describe('plugin-parse-document', function() {

  describe('parsing simple document', () => {

    const testParser = new ParseDocument({
      type: 'test',
      entities: {
        // email: parseEmails,
        interest: parseInterests,
        animals: parseAnimals
      }
    })

    const tests = [
/*
      {
        input: {
          "bundleId": "testModule",
          "templateId": "testTemplate",
          "sourceId": "testSource",
          "uri": "file://test",
          "hash": 478091604,
          "date": {
            "lastChanged": new Date(),
            "elapsed": 0
          },
          "name": "test",
          "text": `
This is a test: sponge.bob@big.ocean likes to play soccer, beach volley and
tir à l'arc
   `
        },
        output: {}
      },*/
      {
        description: "new source and existing target",
        input: {
          "bundleId": "testModule",
          "templateId": "testTemplate",
          "sourceId": "testSource",
          "uri": "file://test",
          "hash": 478091604,
          "date": {
            "lastChanged": new Date(),
            "elapsed": 0
          },
          "name": "test",
          "text": `
Breaking news: Google buys soccer!
`
        },
        output: {
  "type": "record",
  "id": "record:testSource__file://test",
  "bundleId": "testModule",
  "templateId": "testTemplate",
  "sourceId": "testSource",
  "uri": "file://test",
  "hash": 478091604,
  "label": {
    "en": "test"
  },
  "indexed": "\nBreaking news: Google buys soccer!\n",
  "properties": {},
  "links": [
    {
      "link": {
        "type": "link",
        "id": "link:mention",
        "label": {
          "en": "Mentions",
          "fr": "Mentions"
        },
        "description": {
          "en": "Mention in a document",
          "fr": "Mention dans un document"
        },
        "aliases": {
          "en": [
            "mentioned in",
            "has a mention",
            "is mentioned",
            "are mentioned"
          ],
          "fr": [
            "mention dans",
            "mentions dans",
            "mentionné dans",
            "mentionnés dans",
            "mentionnée dans",
            "mentionnées dans",
            "mention par",
            "mentions par",
            "mentionné par",
            "mentionnés par",
            "mentionnée par",
            "mentionnées par",
            "mention",
            "mentions",
            "mentionné",
            "mentionnés",
            "mentionnée",
            "mentionnées"
          ]
        }
      },
      "properties": {
        "ngram": "soccer",
        "score": 1,
        "sentence": 0,
        "word": 6,
        "begin": 28,
        "end": 34
      },
      "target": {
        "properties": {
          "category": "team sports"
        },
        "links": [
          {
            "link": {
              "type": "link",
              "id": "link:instanceof",
              "label": {
                "en": "Type",
                "fr": "Type"
              },
              "plural": {
                "en": "Types",
                "fr": "Types"
              },
              "description": {
                "en": "Of type",
                "fr": "De type"
              },
              "aliases": {
                "en": [
                  "of type"
                ],
                "fr": [
                  "de type"
                ]
              }
            },
            "properties": {},
            "target": {
              "type": "entity",
              "id": "entity:interest",
              "label": {
                "en": "Interest",
                "fr": "Intérêt"
              },
              "plural": {
                "en": "Interests",
                "fr": "Intérêts"
              },
              "description": {
                "en": "Interests and hobbies",
                "fr": "Intérêts et hobbies"
              },
              "aliases": {
                "en": [
                  "interested in"
                ],
                "fr": [
                  "intéressé par",
                  "intéressés par",
                  "intéressée par",
                  "intéressées par",
                  "intéressé(s) par"
                ]
              }
            }
          }
        ],
        "id": "entity:interest__soccer",
        "label": {
          "en": "Soccer",
          "fr": "Football"
        },
        "aliases": [
          "football",
          "foot",
          "soccer",
          "football club",
          "local football club",
          "captain of local football club",
          "captain of local football team",
          "captain of football club",
          "captain of football team",
          "soccer club",
          "local soccer club",
          "captain of local soccer club",
          "captain of local soccer team",
          "captain of soccer club",
          "captain of soccer team"
        ],
        "type": "entity"
      }
    },
    {
      "link": {
        "type": "link",
        "id": "link:mention",
        "label": {
          "en": "Mentions",
          "fr": "Mentions"
        },
        "description": {
          "en": "Mention in a document",
          "fr": "Mention dans un document"
        },
        "aliases": {
          "en": [
            "mentioned in",
            "has a mention",
            "is mentioned",
            "are mentioned"
          ],
          "fr": [
            "mention dans",
            "mentions dans",
            "mentionné dans",
            "mentionnés dans",
            "mentionnée dans",
            "mentionnées dans",
            "mention par",
            "mentions par",
            "mentionné par",
            "mentionnés par",
            "mentionnée par",
            "mentionnées par",
            "mention",
            "mentions",
            "mentionné",
            "mentionnés",
            "mentionnée",
            "mentionnées"
          ]
        }
      },
      "properties": {
        "sentence": 0,
        "word": 2,
        "begin": 16,
        "end": 22,
        "ngram": "Google",
        "score": 1
      },
      "target": {
        "properties": {
          "entity": "Google",
          "number": "singular",
          "gender": "female"
        },
        "links": [
          {
            "link": {
              "type": "link",
              "id": "link:instanceof",
              "label": {
                "en": "Type",
                "fr": "Type"
              },
              "plural": {
                "en": "Types",
                "fr": "Types"
              },
              "description": {
                "en": "Of type",
                "fr": "De type"
              },
              "aliases": {
                "en": [
                  "of type"
                ],
                "fr": [
                  "de type"
                ]
              }
            },
            "properties": {},
            "target": {
              "type": "entity",
              "id": "entity:generic",
              "label": {
                "en": "Generic",
                "fr": "Générique"
              },
              "plural": {
                "en": "Generics",
                "fr": "Génériques"
              },
              "description": {
                "en": "Generic",
                "fr": "Générique"
              },
              "aliases": {
                "en": [
                  "generic",
                  "generics"
                ],
                "fr": [
                  "générique",
                  "génériques",
                  "generique",
                  "generiques"
                ]
              }
            }
          },
          {
            "link": {
              "type": "purchase",
              "id": "link:purchase",
              "label": {
                "en": "Purchase",
                "fr": "Achat"
              },
              "plural": {
                "en": "Purchases",
                "fr": "Achats"
              },
              "description": {
                "en": "Corporate or consumer purchases",
                "fr": "Achats et acquisitions"
              },
              "aliases": {
                "en": [
                  "purchase",
                  "purchases"
                ],
                "fr": [
                  "achat",
                  "achats",
                  "acquisition",
                  "acquisitions"
                ]
              },
              "match": {
                "active": [
                  "bought",
                  "purchase[ds]?",
                  "acquire[ds]?",
                  "buys?",
                  "buying",
                  "acqui[st]",
                  "(?:r)?achète(?:nt)?",
                  "acquiert"
                ],
                "passive": [
                  "bought",
                  "acquired",
                  "purchased",
                  "(?:r)?achetée?s?"
                ]
              }
            },
            "properties": {},
            "target": {
              "properties": {
                "category": "team sports"
              },
              "links": [
                {
                  "link": {
                    "type": "link",
                    "id": "link:instanceof",
                    "label": {
                      "en": "Type",
                      "fr": "Type"
                    },
                    "plural": {
                      "en": "Types",
                      "fr": "Types"
                    },
                    "description": {
                      "en": "Of type",
                      "fr": "De type"
                    },
                    "aliases": {
                      "en": [
                        "of type"
                      ],
                      "fr": [
                        "de type"
                      ]
                    }
                  },
                  "properties": {},
                  "target": {
                    "type": "entity",
                    "id": "entity:interest",
                    "label": {
                      "en": "Interest",
                      "fr": "Intérêt"
                    },
                    "plural": {
                      "en": "Interests",
                      "fr": "Intérêts"
                    },
                    "description": {
                      "en": "Interests and hobbies",
                      "fr": "Intérêts et hobbies"
                    },
                    "aliases": {
                      "en": [
                        "interested in"
                      ],
                      "fr": [
                        "intéressé par",
                        "intéressés par",
                        "intéressée par",
                        "intéressées par",
                        "intéressé(s) par"
                      ]
                    }
                  }
                }
              ],
              "id": "entity:interest__soccer",
              "label": {
                "en": "Soccer",
                "fr": "Football"
              },
              "aliases": [
                "football",
                "foot",
                "soccer",
                "football club",
                "local football club",
                "captain of local football club",
                "captain of local football team",
                "captain of football club",
                "captain of football team",
                "soccer club",
                "local soccer club",
                "captain of local soccer club",
                "captain of local soccer team",
                "captain of soccer club",
                "captain of soccer team"
              ],
              "type": "entity"
            }
          }
        ],
        "id": "entity:generic__google",
        "label": {
          "en": "Google"
        },
        "description": {
          "en": "Google"
        },
        "type": "entity"
      }
    }
  ]
}
      },
      {
        description: "ignore null sources",
        input: {
          "bundleId": "testModule",
          "templateId": "testTemplate",
          "sourceId": "testSource",
          "uri": "file://test",
          "hash": 478091604,
          "date": {
            "lastChanged": new Date(),
            "elapsed": 0
          },
          "name": "test",
          "text": `
On achète une voiture rouge
`
        },
        output: {
  "type": "record",
  "id": "record:testSource__file://test",
  "bundleId": "testModule",
  "templateId": "testTemplate",
  "sourceId": "testSource",
  "uri": "file://test",
  "hash": 478091604,
  "label": {
    "en": "test"
  },
  "indexed": "\nOn achète une voiture rouge\n",
  "properties": {},
  "links": []
},
      },
      {
        description: "red car has a bug?",
        input: {
          "bundleId": "testModule",
          "templateId": "testTemplate",
          "sourceId": "testSource",
          "uri": "file://test",
          "hash": 478091604,
          "date": {
            "lastChanged": new Date(),
            "elapsed": 0
          },
          "name": "test",
          "text": `
Jane Doe buys a red car
`
        },
  output: {
  "type": "record",
  "id": "record:testSource__file://test",
  "bundleId": "testModule",
  "templateId": "testTemplate",
  "sourceId": "testSource",
  "uri": "file://test",
  "hash": 478091604,
  "label": {
    "en": "test"
  },
  "indexed": "\nJane Doe buys a red car\n",
  "properties": {},
  "links": [
    {
      "link": {
        "type": "link",
        "id": "link:mention",
        "label": {
          "en": "Mentions",
          "fr": "Mentions"
        },
        "description": {
          "en": "Mention in a document",
          "fr": "Mention dans un document"
        },
        "aliases": {
          "en": [
            "mentioned in",
            "has a mention",
            "is mentioned",
            "are mentioned"
          ],
          "fr": [
            "mention dans",
            "mentions dans",
            "mentionné dans",
            "mentionnés dans",
            "mentionnée dans",
            "mentionnées dans",
            "mention par",
            "mentions par",
            "mentionné par",
            "mentionnés par",
            "mentionnée par",
            "mentionnées par",
            "mention",
            "mentions",
            "mentionné",
            "mentionnés",
            "mentionnée",
            "mentionnées"
          ]
        }
      },
      "properties": {
        "sentence": 0,
        "word": 0,
        "begin": 1,
        "end": 9,
        "ngram": "Jane Doe",
        "score": 1
      },
      "target": {
        "properties": {
          "entity": "Jane Doe",
          "number": "singular",
          "gender": "neutral"
        },
        "links": [
          {
            "link": {
              "type": "link",
              "id": "link:instanceof",
              "label": {
                "en": "Type",
                "fr": "Type"
              },
              "plural": {
                "en": "Types",
                "fr": "Types"
              },
              "description": {
                "en": "Of type",
                "fr": "De type"
              },
              "aliases": {
                "en": [
                  "of type"
                ],
                "fr": [
                  "de type"
                ]
              }
            },
            "properties": {},
            "target": {
              "type": "entity",
              "id": "entity:generic",
              "label": {
                "en": "Generic",
                "fr": "Générique"
              },
              "plural": {
                "en": "Generics",
                "fr": "Génériques"
              },
              "description": {
                "en": "Generic",
                "fr": "Générique"
              },
              "aliases": {
                "en": [
                  "generic",
                  "generics"
                ],
                "fr": [
                  "générique",
                  "génériques",
                  "generique",
                  "generiques"
                ]
              }
            }
          },
          {
            "link": {
              "type": "purchase",
              "id": "link:purchase",
              "label": {
                "en": "Purchase",
                "fr": "Achat"
              },
              "plural": {
                "en": "Purchases",
                "fr": "Achats"
              },
              "description": {
                "en": "Corporate or consumer purchases",
                "fr": "Achats et acquisitions"
              },
              "aliases": {
                "en": [
                  "purchase",
                  "purchases"
                ],
                "fr": [
                  "achat",
                  "achats",
                  "acquisition",
                  "acquisitions"
                ]
              },
              "match": {
                "active": [
                  "bought",
                  "purchase[ds]?",
                  "acquire[ds]?",
                  "buys?",
                  "buying",
                  "acqui[st]",
                  "(?:r)?achète(?:nt)?",
                  "acquiert"
                ],
                "passive": [
                  "bought",
                  "acquired",
                  "purchased",
                  "(?:r)?achetée?s?"
                ]
              }
            },
            "properties": {},
            "target": {
              "properties": {
                "entity": "car",
                "number": "singular",
                "gender": "neutral",
                "color": "red"
              },
              "links": [
                {
                  "link": {
                    "type": "link",
                    "id": "link:instanceof",
                    "label": {
                      "en": "Type",
                      "fr": "Type"
                    },
                    "plural": {
                      "en": "Types",
                      "fr": "Types"
                    },
                    "description": {
                      "en": "Of type",
                      "fr": "De type"
                    },
                    "aliases": {
                      "en": [
                        "of type"
                      ],
                      "fr": [
                        "de type"
                      ]
                    }
                  },
                  "properties": {},
                  "target": {
                    "type": "entity",
                    "id": "entity:generic",
                    "label": {
                      "en": "Generic",
                      "fr": "Générique"
                    },
                    "plural": {
                      "en": "Generics",
                      "fr": "Génériques"
                    },
                    "description": {
                      "en": "Generic",
                      "fr": "Générique"
                    },
                    "aliases": {
                      "en": [
                        "generic",
                        "generics"
                      ],
                      "fr": [
                        "générique",
                        "génériques",
                        "generique",
                        "generiques"
                      ]
                    }
                  }
                }
              ],
              "id": "entity:generic__red-car",
              "label": {
                "en": "red car"
              },
              "description": {
                "en": "red car"
              },
              "type": "entity"
            }
          }
        ],
        "id": "entity:generic__jane-doe",
        "label": {
          "en": "Jane Doe"
        },
        "description": {
          "en": "Jane Doe"
        },
        "type": "entity"
      }
    },
    {
      "link": {
        "type": "link",
        "id": "link:mention",
        "label": {
          "en": "Mentions",
          "fr": "Mentions"
        },
        "description": {
          "en": "Mention in a document",
          "fr": "Mention dans un document"
        },
        "aliases": {
          "en": [
            "mentioned in",
            "has a mention",
            "is mentioned",
            "are mentioned"
          ],
          "fr": [
            "mention dans",
            "mentions dans",
            "mentionné dans",
            "mentionnés dans",
            "mentionnée dans",
            "mentionnées dans",
            "mention par",
            "mentions par",
            "mentionné par",
            "mentionnés par",
            "mentionnée par",
            "mentionnées par",
            "mention",
            "mentions",
            "mentionné",
            "mentionnés",
            "mentionnée",
            "mentionnées"
          ]
        }
      },
      "properties": {
        "sentence": 0,
        "word": 4,
        "begin": 17,
        "end": 24,
        "ngram": "red car",
        "score": 1
      },
      "target": {
        "properties": {
          "entity": "car",
          "number": "singular",
          "gender": "neutral",
          "color": "red"
        },
        "links": [
          {
            "link": {
              "type": "link",
              "id": "link:instanceof",
              "label": {
                "en": "Type",
                "fr": "Type"
              },
              "plural": {
                "en": "Types",
                "fr": "Types"
              },
              "description": {
                "en": "Of type",
                "fr": "De type"
              },
              "aliases": {
                "en": [
                  "of type"
                ],
                "fr": [
                  "de type"
                ]
              }
            },
            "properties": {},
            "target": {
              "type": "entity",
              "id": "entity:generic",
              "label": {
                "en": "Generic",
                "fr": "Générique"
              },
              "plural": {
                "en": "Generics",
                "fr": "Génériques"
              },
              "description": {
                "en": "Generic",
                "fr": "Générique"
              },
              "aliases": {
                "en": [
                  "generic",
                  "generics"
                ],
                "fr": [
                  "générique",
                  "génériques",
                  "generique",
                  "generiques"
                ]
              }
            }
          }
        ],
        "id": "entity:generic__red-car",
        "label": {
          "en": "red car"
        },
        "description": {
          "en": "red car"
        },
        "type": "entity"
      }
    }
  ]
}
      },
      {
        description: "multi-sentence bug",
        input: {
          "bundleId": "testModule",
          "templateId": "testTemplate",
          "sourceId": "testSource",
          "uri": "file://test",
          "hash": 478091604,
          "date": {
            "lastChanged": new Date(),
            "elapsed": 0
          },
          "name": "test",
          "text": `
The bear is eating the herring. I repeat, the bear..
   `
        },
        output: {
  "type": "record",
  "id": "record:testSource__file://test",
  "bundleId": "testModule",
  "templateId": "testTemplate",
  "sourceId": "testSource",
  "uri": "file://test",
  "hash": 478091604,
  "label": {
    "en": "test"
  },
  "indexed": "\nThe bear is eating the herring. I repeat, the bear..\n   ",
  "properties": {},
  "links": [
    {
      "link": {
        "type": "link",
        "id": "link:mention",
        "label": {
          "en": "Mentions",
          "fr": "Mentions"
        },
        "description": {
          "en": "Mention in a document",
          "fr": "Mention dans un document"
        },
        "aliases": {
          "en": [
            "mentioned in",
            "has a mention",
            "is mentioned",
            "are mentioned"
          ],
          "fr": [
            "mention dans",
            "mentions dans",
            "mentionné dans",
            "mentionnés dans",
            "mentionnée dans",
            "mentionnées dans",
            "mention par",
            "mentions par",
            "mentionné par",
            "mentionnés par",
            "mentionnée par",
            "mentionnées par",
            "mention",
            "mentions",
            "mentionné",
            "mentionnés",
            "mentionnée",
            "mentionnées"
          ]
        }
      },
      "properties": {
        "ngram": "bear",
        "score": 1,
        "sentence": 0,
        "word": 2,
        "begin": 5,
        "end": 9
      },
      "target": {
        "properties": {
          "plural": {
            "en": "Bears",
            "fr": "Ours"
          },
          "classification": {
            "kingdom": "Animalia",
            "subkingdom": "Eumetazoa",
            "phylum": "Chordata",
            "subphylum": "Vertebrata",
            "class": "Mammalia",
            "order": "Carnivora",
            "suborder": "Caniformia",
            "family": "Ursidae"
          }
        },
        "links": [],
        "id": "entity:animals__bear",
        "label": {
          "en": "Bear",
          "fr": "Ours"
        },
        "aliases": {
          "en": [
            "Bear",
            "Bears"
          ],
          "fr": [
            "l'ours",
            "l'ourse",
            "l'ourson",
            "l'oursonne",
            "d'ours",
            "d'ourse",
            "d'ourses",
            "d'ourson",
            "d'oursons",
            "d'oursonne",
            "d'oursonnes",
            "Ours",
            "Ourson",
            "Oursons",
            "Ourse",
            "Ourses",
            "Oursonne",
            "Oursonnes"
          ]
        },
        "type": "entity"
      }
    },
    {
      "link": {
        "type": "link",
        "id": "link:mention",
        "label": {
          "en": "Mentions",
          "fr": "Mentions"
        },
        "description": {
          "en": "Mention in a document",
          "fr": "Mention dans un document"
        },
        "aliases": {
          "en": [
            "mentioned in",
            "has a mention",
            "is mentioned",
            "are mentioned"
          ],
          "fr": [
            "mention dans",
            "mentions dans",
            "mentionné dans",
            "mentionnés dans",
            "mentionnée dans",
            "mentionnées dans",
            "mention par",
            "mentions par",
            "mentionné par",
            "mentionnés par",
            "mentionnée par",
            "mentionnées par",
            "mention",
            "mentions",
            "mentionné",
            "mentionnés",
            "mentionnée",
            "mentionnées"
          ]
        }
      },
      "properties": {
        "ngram": "herring",
        "score": 1,
        "sentence": 0,
        "word": 6,
        "begin": 24,
        "end": 31
      },
      "target": {
        "properties": {
          "plural": {
            "en": "Herring",
            "fr": "Harengs"
          },
          "classification": {
            "kingdom": "Animalia",
            "phylum": "Chordata",
            "subphylum": "Vertebrata",
            "infraphylum": "Gnathostomata",
            "superclass": "Osteichthyes",
            "class": "Actinopterygii",
            "subclass": "Neopterygii",
            "infraclass": "Teleostei",
            "superorder": "Clupeomorpha",
            "order": "Clupeiformes",
            "suborder": "Clupeoidei",
            "family": "Clupeidae",
            "subfamily": "Clupeinae",
            "genus": "Clupea"
          }
        },
        "links": [],
        "id": "entity:animals__herring",
        "label": {
          "en": "Herring",
          "fr": "Hareng"
        },
        "aliases": {
          "en": [
            "Herring"
          ],
          "fr": [
            "Hareng",
            "Harengs",
            "Hareng frais",
            "Harengs frais"
          ],
          "la": [
            "Clupea"
          ]
        },
        "type": "entity"
      }
    },
    {
      "link": {
        "type": "link",
        "id": "link:mention",
        "label": {
          "en": "Mentions",
          "fr": "Mentions"
        },
        "description": {
          "en": "Mention in a document",
          "fr": "Mention dans un document"
        },
        "aliases": {
          "en": [
            "mentioned in",
            "has a mention",
            "is mentioned",
            "are mentioned"
          ],
          "fr": [
            "mention dans",
            "mentions dans",
            "mentionné dans",
            "mentionnés dans",
            "mentionnée dans",
            "mentionnées dans",
            "mention par",
            "mentions par",
            "mentionné par",
            "mentionnés par",
            "mentionnée par",
            "mentionnées par",
            "mention",
            "mentions",
            "mentionné",
            "mentionnés",
            "mentionnée",
            "mentionnées"
          ]
        }
      },
      "properties": {
        "ngram": "bear",
        "score": 1,
        "sentence": 1,
        "word": 4,
        "begin": 47,
        "end": 51
      },
      "target": {
        "properties": {
          "plural": {
            "en": "Bears",
            "fr": "Ours"
          },
          "classification": {
            "kingdom": "Animalia",
            "subkingdom": "Eumetazoa",
            "phylum": "Chordata",
            "subphylum": "Vertebrata",
            "class": "Mammalia",
            "order": "Carnivora",
            "suborder": "Caniformia",
            "family": "Ursidae"
          }
        },
        "links": [],
        "id": "entity:animals__bear",
        "label": {
          "en": "Bear",
          "fr": "Ours"
        },
        "aliases": {
          "en": [
            "Bear",
            "Bears"
          ],
          "fr": [
            "l'ours",
            "l'ourse",
            "l'ourson",
            "l'oursonne",
            "d'ours",
            "d'ourse",
            "d'ourses",
            "d'ourson",
            "d'oursons",
            "d'oursonne",
            "d'oursonnes",
            "Ours",
            "Ourson",
            "Oursons",
            "Ourse",
            "Ourses",
            "Oursonne",
            "Oursonnes"
          ]
        },
        "type": "entity"
      }
    }
  ]
}
      }
      /* {
        description: "existing source and new target",
        input: {
          "bundleId": "testModule",
          "templateId": "testTemplate",
          "sourceId": "testSource",
          "uri": "file://test",
          "hash": 478091604,
          "date": {
            "lastChanged": new Date(),
            "elapsed": 0
          },
          "name": "test",
          "text": `
Breaking news: soccer buys Google!
   `
        },
        output: {}
      }*/

    ]

    it('should work', function(done) {

      tests.reduce((prom, test) => {
        return prom.then(() => {
          return testParser.parse(test.input).then(output => {
            delete output.created_at
            delete output.date
            //console.log(`expected: ${JSON.stringify(test.output, null, 2)}`)
            // console.log(`output: ${JSON.stringify(output, null, 2)}`)
            expect(output).to.be.like(test.output)
            return Promise.resolve(true)
          })
        })
      }, Promise.resolve(0)).then(ended => {
        done()
      }).catch(err => done(err))
    })
  })

})
