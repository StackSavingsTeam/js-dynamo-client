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
  createTable: (params) => {
    return new Promise((resolve, reject) => {
      awsdb.createTable(params, (err, data) => {
        response(resolve, reject, err, data, 'Table ' + params.TableName + ' created!')
      })
    })
  },
  deleteTable: (params) => {
    return new Promise((resolve, reject) => {
      awsdb.deleteTable(params, (err, data) => {
        response(resolve, reject, err, data, 'Table "' + params.TableName + '" deleted!')
      })
    })
  },
  insertItems: (params) => {
    return new Promise((resolve, reject) => {
      documentClient.put(params, (err, data) => {
        response(resolve, reject, err, data, 'Insert success!')
      })
    })
  },
  insertItemsBath: (params) => {
    return new Promise((resolve, reject) => {
      documentClient.batchWrite(params, (err, data) => {
        response(resolve, reject, err, data, 'Insert success!')
      })
    })
  },
  getItems: (params) => {
    return new Promise((resolve, reject) => {
      documentClient.query(params, (err, data) => {
        response(resolve, reject, err, data, 'Query done!')
      })
    })
  },
  scanItems: (params) => {
    return new Promise((resolve, reject) => {
      documentClient.scan(params, (err, data) => {
        response(resolve, reject, err, data, 'Scan done!')
      })
    })
  },
  deleteItems: (params) => {
	return new Promise((resolve, reject) => {
	  documentClient.delete(params, (err, data)=> {
        response(resolve, reject, err, data, 'Item deleted!')
      })
	})
  }

}

module.exports = dynamoDB
