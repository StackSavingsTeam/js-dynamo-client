'use strict'
const uuid = require('uuid')
const crudDynamoDB = require('./crudDynamoDB.js')
const logger = require('../utils/Logger')
const t =  require('../Definitions/TableNames')

const parametros = {
  TableName: t.currencies,
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

const promise = crudDynamoDB.createTable(parametros)

promise.then(data => {
  logger.info(data.mensaje_respuesta)
}, err => {
  logger.error(err.mensaje_respuesta)
})
