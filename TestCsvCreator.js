const logger = require('../utils/Logger')
const csv = require('./csvCreator.js')

var promise = csv.ticketsCsv()
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
