'use strict'
const crudDynamoDB = require('./crudDynamoDB.js')

const WriteData = {
  insertData: (parametros) => {
    return new Promise((resolve, reject) => {
      crudDynamoDB.insertTable(parametros).then(respuesta => {
        return resolve(respuesta)
      }, err => {
        return reject(err)
      })
    })
  },
  insertItemsBath: (parametros) => {
    return new Promise((resolve, reject) => {
      crudDynamoDB.insertItems(parametros).then(respuesta => {
        return resolve(respuesta)
      }, err => {
        return reject(err)
      })
    })
  }
}

module.exports = WriteData
