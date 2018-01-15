'use strict'

const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()
logger.info(dynamoDB.insertItemBatch())
return
const parametros = {
  TableName: "Test"
}

const promise = dynamoDB.deleteTable(parametros)

promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
