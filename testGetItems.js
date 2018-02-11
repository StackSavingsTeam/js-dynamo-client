'use strict'

//const dynamoDB = require('@stacksavings/dynamodb')
const dynamoDB = require('./dynamoDB')
const logger = require('@stacksavings/utils').log()

const parameters = {
      TableName: "Test",
      ProjectionExpression: "currencyPair",
      ExpressionAttributeNames:{
          "#id": "id"
      },
      ExpressionAttributeValues: {
        ':id': '1cedd7a0-fa26-11e7-81e3-23cdc36fe8fb'
      },
      KeyConditionExpression: '#id = :id'
    }

const promise = dynamoDB.e(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
