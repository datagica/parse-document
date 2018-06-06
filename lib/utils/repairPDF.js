'use strict'

// yeah, I know.. it pains me having to write such a function..
function repairPDF (txt) {
  // fix: 'langue maternelleExpériences professionnellesMai à Juin'
  // to: 'langue maternelle Expériences professionnelles Mai à Juin'
  return txt
    .replace(/(\w{2,}[a-zéèïôöûüùâñäà])([A-ZÄÃÖÜÔÛÂÎÏÑ]\w{2,})/g, '$1 $2')
    .replace(/\s+/gi, " ")
}

module.exports = repairPDF
