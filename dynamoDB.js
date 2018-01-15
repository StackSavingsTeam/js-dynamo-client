'use strict'

const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const awsdb = new AWS.DynamoDB({correctClockSkew: true})
const documentClient = new AWS.DynamoDB.DocumentClient()

const response = (resolve, reject, err, data, customMsj) => {
  if (err) {
    return reject({
      code: false,
      message: err.message + ' Codigo: ' + err.code + ' Estatus: ' + err.statusCode
    })
  } else {
    return resolve({
      code: true,
      message: customMsj,
      data: data
    })
  }
}

const dynamoDB = {
  createTable: (parametros) => {
    return new Promise((resolve, reject) => {
      awsdb.createTable(parametros, (err, data) => {
        response(resolve, reject, err, data, 'Table ' + parametros.TableName + ' created!')
      })
    })
  },
  deleteTable: (parametros) => {
    return new Promise((resolve, reject) => {
      awsdb.deleteTable(parametros, (err, data) => {
        response(resolve, reject, err, data, 'Table "' + parametros.TableName + '" deleted!')
      })
    })
  },
  insertItems: (parametros) => {
    return new Promise((resolve, reject) => {
      documentClient.put(parametros, (err, data) => {
        response(resolve, reject, err, data, 'Insert success!')
      })
    })
  },
  insertItemBatch: (parametros) => {
    return new Promise((resolve, reject) => {
      documentClient.batchWrite(parametros, (err, data) => {
        response(resolve, reject, err, data, 'Insert success!')
      })
    })
  },
  getItems: (params) => {
    return new Promise((resolve, reject) => {
      awsdb.query(params, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Query done!')
      })
    })
  },
  scanItems: (params) => {
    return new Promise((resolve, reject) => {
      awsdb.scan(params, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Scan done!')
      })
    })
  }

}

module.exports = dynamoDB
