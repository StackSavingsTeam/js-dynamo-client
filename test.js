'use strict'

const dynamoDB = require('./dynamoDB.js')
const logger = require('@stacksavings/utils').log()

const parametros = {
  TableName: "Test",
  KeySchema: [
              { AttributeName: "currencyPair", "KeyType": "HASH" }
    ],
  AttributeDefinitions: [
      { AttributeName: "currencyPair", "AttributeType": "S" }
    ],
  ProvisionedThroughput: {
      "ReadCapacityUnits": 100,
      "WriteCapacityUnits": 100
  }
}

const promise = dynamoDB.createTable(parametros)

promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
