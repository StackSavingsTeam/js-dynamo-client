'use strict';

var config = require('./config');
const dynamoDBIncl = require('../dynamodb')
const dynamoDB = new dynamoDBIncl({endpoint: config.dynamoendpoint})
const logger = require('@stacksavings/utils').log()

const parameters = {
  TableName: "Test7",
  KeySchema: [
              { AttributeName: "id", "KeyType": "HASH" }
  ],
  AttributeDefinitions: [
      { AttributeName: "id", "AttributeType": "S" }
    ],
  ProvisionedThroughput: {
      "ReadCapacityUnits": 1,
      "WriteCapacityUnits": 1
  }
}

/*const promise = dynamoDB.createTable(parameters)
promise.then(data => {
  logger.info(data)
  insertTable(parameters.TableName)
}, err => {
  if(err.code == false && err.status == 400){
    insertTable(parameters.TableName)
  }else{
    logger.error(err)
  }
})*/

function insertTable(tabla){
  logger.info('insertando registro')
  const uuid = require('uuid')
  var timeStamp = String(Math.floor(Date.now() / 1000));
  const parameters = {
    TableName: tabla,
    Item: {
        id: uuid.v1(),
        currencyPair: "BTC_ETH2",
        timestamp: timeStamp
    }
  }

  const promise = dynamoDB.insertItems(parameters)
  promise.then(data => {
    logger.info(data)
    //deleteTable(tabla)
  }, err => {
    logger.error(err)
  })

}

function deleteTable(tabla){
  logger.info('Borrando la tabla '+tabla)
  const parameters = {
    TableName: tabla
  }

  const promise = dynamoDB.deleteTable(parameters)
  promise.then(data => {
    logger.info(data)
  }, err => {
    logger.error(err)
  })

}

function deleteItems(params){
  logger.info('Eliminar registro')

  const promise = dynamoDB.deleteItems(params)
  promise.then(data=>{
    logger.info(data)
  },err=>{
      logger.info(err)
  })
}

function getscanItems(params){
  logger.info('obtener datos de tabla')

  const promise = dynamoDB.scanItems(params)
  promise.then(data => {
    logger.info(data)
  }, err => {
    logger.error(err)
  })

}

const params = {
  TableName : 'Test7',
  Key: {
    "id":"38edcb70-1026-11e8-87db-2b7abd387e50"
  }
}
//deleteItems(params)

const paramConsulta= {
  TableName: 'Test7',
  AttributesToGet: [ "currencyPair", "id", "timestamp" ]
}
getscanItems(paramConsulta)
