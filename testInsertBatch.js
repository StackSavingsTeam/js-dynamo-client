'use strict'

const uuid = require('uuid')
const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()

var timeStamp = String(Math.floor(Date.now() / 1000));
const parameters = {
  RequestItems: {
      "Test": [
          {
            PutRequest: {
              Item: {
                  id: uuid.v1(),
                  currencyPair: "BTC_ETH",
                  timestamp: timeStamp
              }
            }
          },
          {
            PutRequest: {
              Item: {
                  id: uuid.v1(),
                  currencyPair: "BTC_ETH2",
                  timestamp: timeStamp
              }
            }
          }
        ]
  }
}

const promise = dynamoDB.insertItemsBath(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
