'use strict'
const uuid = require('uuid')
const crudDynamoDB = require('./crudDynamoDB.js')
const logger = require('../utils/Logger')
const t =  require('../Definitions/TableNames') 

const parametros = {
  TableName: t.ticks
}

const promise = crudDynamoDB.deleteTable(parametros)

promise.then(data => {
  logger.info(data.mensaje_respuesta)
}, err => {
  logger.error(err.mensaje_respuesta)
})
