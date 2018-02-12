'use strict'

const dynamoDB = class {

  constructor(config){

    if(typeof config == 'undefined'){
      var endpoint = 'http://localhost:8000'
      var region = 'us-east-1'
    }else{
      var endpoint = (config.endpoint) ? config.endpoint : 'http://localhost:8000'
      var region = (config.region) ? config.region : 'us-east-1'
    }

    const AWS = require('aws-sdk')
    AWS.config.update({
      region: region,
      endpoint: endpoint
    });

    this.awsdb = new AWS.DynamoDB()
    this.DocumentClient = new AWS.DynamoDB.DocumentClient()

  }
  response (resolve, reject, err, data, customMsj) {
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
  createTable (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.awsdb
      awsdb.createTable(params, (err, data) => {
        this.response(resolve, reject, err, data, 'Table ' + params.TableName + ' created!')
      })
    })
  }
  deleteTable (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.awsdb
      awsdb.deleteTable(params, (err, data) => {
        this.response(resolve, reject, err, data, 'Table "' + params.TableName + '" deleted!')
      })
    })
  }
  insertItems (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
      awsdb.put(params, (err, data) => {
        this.response(resolve, reject, err, data, 'Insert success!')
      })
    })
  }
  insertItemsBath (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
      awsdb.batchWrite(params, (err, data) => {
        this.response(resolve, reject, err, data, 'Insert success!')
      })
    })
  }
  getItems (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
      awsdb.query(params, (err, data) => {
        this.response(resolve, reject, err, data, 'Query done!')
      })
    })
  }
  scanItems (params) {
    return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
      awsdb.scan(params, (err, data) => {
        this.response(resolve, reject, err, data, 'Scan done!')
      })
    })
  }
  deleteItems (params) {
  	return new Promise((resolve, reject) => {
      let awsdb = this.DocumentClient
  	  awsdb.delete(params, (err, data)=> {
        this.response(resolve, reject, err, data, 'Item deleted!')
        })
  	})
  }

}

module.exports = dynamoDB
