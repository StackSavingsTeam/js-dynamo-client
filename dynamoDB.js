'use strict'

let response = (resolve, reject, err, data, customMsj) => {
  if (err) {
    return reject({
      code: false,
      message: err.message,
      codeDescrip: err.code,
      status: err.statusCode
    })
  } else {
    return resolve({
      code: true,
      message: customMsj,
      data: data
    })
  }
}

const dynamoDB = class {

  constructor(config){
    const AWS = require('aws-sdk')
    if(config.isProduction){
      let configProd = {
        region: 'us-east-1',
        accessKeyId : config.accessKeyId,
        secretAccessKey : config.secretAccessKey
      }
      AWS.config.update(configProd)
      this.awsdb = new AWS.DynamoDB(configProd)
      this.DocumentClient = new AWS.DynamoDB.DocumentClient(configProd)
    }else{
      let configLocal = {
        region: 'us-east-1',
        endpoint: config.endpoint,
        accessKeyId : 'AKID',
        secretAccessKey : 'SECRET',
        port: config.port
      }
      AWS.config.update(configLocal)
      this.awsdb = new AWS.DynamoDB(configLocal)
      this.DocumentClient = new AWS.DynamoDB.DocumentClient(configLocal)
    }
  }

  createTable (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.awsdb
      awsdb.createTable(params, (err, data) => {
        response(resolve, reject, err, data, 'Table ' + params.TableName + ' created!')
      })
    })
  }
  deleteTable (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.awsdb
      awsdb.deleteTable(params, (err, data) => {
        response(resolve, reject, err, data, 'Table "' + params.TableName + '" deleted!')
      })
    })
  }
  insertItems (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
      awsdb.put(params, (err, data) => {
        response(resolve, reject, err, data, 'Insert success!')
      })
    })
  }
  insertItemsBath (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
      awsdb.batchWrite(params, (err, data) => {
        response(resolve, reject, err, data, 'Insert success!')
      })
    })
  }
  getItems (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
      awsdb.query(params, (err, data) => {
        response(resolve, reject, err, data, 'Query done!')
      })
    })
  }
  scanItems (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
      awsdb.scan(params, (err, data) => {
        response(resolve, reject, err, data, 'Scan done!')
      })
    })
  }
  deleteItems (params) {
  	return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
  	  awsdb.delete(params, (err, data)=> {
        response(resolve, reject, err, data, 'Item deleted!')
        })
  	})
  }

}

module.exports = dynamoDB
