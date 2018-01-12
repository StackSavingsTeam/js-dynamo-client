'use strict'
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})

const log = require('../utils/utils.js').log
const awsdb = new AWS.DynamoDB({correctClockSkew: true})
const documentClient = new AWS.DynamoDB.DocumentClient()
const logger = require('../utils/Logger')
const t =  require('../Definitions/TableNames')

const respuestaDynamodb = (resolve, reject, err, data, customMsj) => {
  if (err) {
    return reject({
      codigo_respuesta: false,
      mensaje_respuesta: err.message + ' Codigo: ' + err.code + ' Estatus: ' + err.statusCode
    })
  } else {
    return resolve({
      codigo_respuesta: true,
      mensaje_respuesta: customMsj,
      data: data
    })
  }
}

const crudDynamoDB = {
  createTable: (parametros) => {
    return new Promise((resolve, reject) => {
      awsdb.createTable(parametros, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Tabla ' + parametros.TableName + ' se creo con exito!')
      })
    })
  },
  deleteTable: (parametros) => {
    return new Promise((resolve, reject) => {
      awsdb.deleteTable(parametros, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Tabla "' + parametros.TableName + '" eliminada con éxito')
      })
    })
  },
  insertTable: (parametros) => {
    return new Promise((resolve, reject) => {
      awsdb.putItem(parametros, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Datos insertados con éxito')
      })
    })
  },
  insertItems: (parametros) => {
    return new Promise((resolve, reject) => {
      documentClient.put(parametros, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Datos insertados con éxito')
      })
    })
  },
  insertItemBatch: (parametros) => {
    return new Promise((resolve, reject) => {
      documentClient.batchWrite(parametros, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Datos insertados con éxito')
      })
    })
  },
  getItems: (params) => {
    return new Promise((resolve, reject) => {
      awsdb.query(params, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Datos obtenidos con éxito')
      })
    })
  },
  scanItems: (params) => {
    return new Promise((resolve, reject) => {
      awsdb.scan(params, (err, data) => {
        respuestaDynamodb(resolve, reject, err, data, 'Datos obtenidos con éxito')
      })
    })
  }

}

module.exports = crudDynamoDB
