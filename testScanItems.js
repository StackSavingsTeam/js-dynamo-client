'use strict'

const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()

const parameters = {
  TableName: 'Test',
  AttributesToGet: [ "currencyPair" ]
}

const promise = dynamoDB.scanItems(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
