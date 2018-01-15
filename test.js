'use strict'

const dynamoDB = require('./dynamoDB.js')
const logger = require('@stacksavings/utils').log()

const parametros = {
  TableName: "Test"
}

const promise = dynamoDB.deleteTable(parametros)

promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
