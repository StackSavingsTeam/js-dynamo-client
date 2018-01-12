'use strict'

const logger = require('../utils/Logger')

const csvOutput = {
  ticketsCsv: () => {
    return new Promise((resolve, reject) => {
      const _ = require('lodash')
      const crudDynamoDB = require('./crudDynamoDB.js')
      const RequestItems = require('./csvRequestItems.js')
      const json2csv = require('json2csv');
      const fs = require('fs');

      let paramsC = RequestItems.currenciesRequestItem()
      let itemsC = crudDynamoDB.scanItems(paramsC);
      logger.info('Consulting currencies')

      itemsC.then(dataC => {

        let itemC = dataC.data.Items
        _.forEach(itemC, function(value){
          let currencyPair = value.currencyPair.S
          let params = RequestItems.ticketsRequestItem(currencyPair)
          let items = crudDynamoDB.getItems(params);
          logger.info('Consulting tickets')

          items.then(data => {
            let itemsJson = []
            let itemT = data.data.Items
            logger.info('Fetching data')
            _.forEach(itemT, function(valueT){
              let tick = valueT.ticks.L
              _.forEach(tick, function(valueT2){
                let jsonString = {
                    currencyPair: valueT.currencyPair.S,
                    timestamp: valueT.timestamp.S,
                    date: valueT2.M.date.N,
                    volume: valueT2.M.volume.N,
                    low: valueT2.M.low.N,
                    weightedAverage: valueT2.M.weightedAverage.N,
                    quoteVolume: valueT2.M.quoteVolume.N,
                    close: valueT2.M.close.N,
                    open: valueT2.M.open.N
                }
                itemsJson.push(jsonString)
              })
            })
            
            logger.info('Creating file CSV')
            let fields = ['currencyPair', 'timestamp', 'date', 'volume', 'low', 'weightedAverage', 'quoteVolume', 'close', 'open'];
            var csv = json2csv({ data: itemsJson, fields: fields });
            fs.writeFile('Output/'+currencyPair+'.csv', csv, function(err){

              if(err){
                return reject({
                  codigo_respuesta: false,
                  mensaje_respuesta: 'Error al generar el archivo'
                })
              }else{
                return resolve({
                  codigo_respuesta: true,
                  mensaje_respuesta: 'Successfully generated file! the file was generated with the name '+currencyPair+'.csv'
                })
              }

            });

          }, err => {
            return reject({
              err
            })
          })
        })
      }, err => {
        logger.info(err)
      })
    })
  }
}

module.exports = csvOutput
