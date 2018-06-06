'use strict'

function humanizeFilename (filename) {
  return filename
    .replace(/\.(?:doc|docx|odt|pdf|md|rtf|gif|png|jpg|jpeg|txt|csv|sql)$/i,'')
    .replace(/[_\.]/gi, ' ')
    .toLowerCase()
}


module.exports = humanizeFilename
