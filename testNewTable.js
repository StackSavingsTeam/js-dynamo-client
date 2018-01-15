'use strict'

const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()

const parameters = {
  TableName: "Test",
  KeySchema: [
              { AttributeName: "id", "KeyType": "HASH" }
    ],
  AttributeDefinitions: [
      { AttributeName: "id", "AttributeType": "S" }
    ],
  ProvisionedThroughput: {
      "ReadCapacityUnits": 100,
      "WriteCapacityUnits": 100
  }
}

const promise = dynamoDB.createTable(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
