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

    let port = 8080
    let localEndpoint = 'http://localhost:' + port
    let awsRegion = 'us-east-1'

    let endpoint,region
    if(typeof config == 'undefined'){
      endpoint = localEndpoint
      region = awsRegion
    }else{
      endpoint = (config.endpoint) ? config.endpoint : localEndpoint
      region = (config.region) ? config.region : awsRegion
    }

    const AWS = require('aws-sdk')

    let config2 = {
      region: region,
      endpoint: endpoint,
      accessKeyId : 'AKID',
      secretAccessKey : 'SECRET',
      port: port
    }

    AWS.config.update(config2);

    this.awsdb = new AWS.DynamoDB(config2)
    this.DocumentClient = new AWS.DynamoDB.DocumentClient(config2)

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
