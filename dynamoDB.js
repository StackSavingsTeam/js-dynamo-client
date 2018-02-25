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

    let configAws = {}

    if(config && config.endpoint){configAws.endpoint = config.endpoint}
    if(config && config.region){configAws.region = config.region}else{configAws.region = 'us-east-1'}
    if(config && config.port){configAws.port = config.port}
    if(config && config.accessKeyId){configAws.accessKeyId = config.accessKeyId}
    if(config && config.secretAccessKey){configAws.secretAccessKey = config.secretAccessKey}

    const AWS = require('aws-sdk')

    AWS.config.update(configAws);

    this.awsdb = new AWS.DynamoDB(configAws)
    this.DocumentClient = new AWS.DynamoDB.DocumentClient(configAws)

  }

  createTable (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.awsdb
      console.log(JSON.stringify(params))
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
