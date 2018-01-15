'use strict'

const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()

const parameters = {
  TableName: "Test"
}

const promise = dynamoDB.deleteTable(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
