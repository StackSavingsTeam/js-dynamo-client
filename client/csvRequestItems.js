'use strict'

const requestItem = {

  ticketsRequestItem: (currencyPair) => {
    const t =  require('../Definitions/TableNames')

    let request = {
      TableName: t.ticks,
      ExpressionAttributeNames:{
          "#currencyPair": "currencyPair"
      },
      ExpressionAttributeValues: {
        ':currency' : {S: currencyPair}
      },
      KeyConditionExpression: '#currencyPair = :currency'
    }
    return request;
  },
  currenciesRequestItem: () => {
    const t =  require('../Definitions/TableNames')
    const timeStamp = String(Math.floor(Date.now() / 1000));

    let request = {
      TableName: t.currencies,
      AttributesToGet: [ "currencyPair" ]
    }
    return request;
  }

}

module.exports = requestItem
