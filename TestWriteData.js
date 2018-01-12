'use strict'
const uuid = require('uuid')
const WriteData = require('./WriteData.js')
const logger = require('../utils/Logger')
const t =  require('../Definitions/TableNames')
const CurrenciesAvailable = require('../DataCollection/CurrenciesAvailablePoloniex')

const currenciesPromise = CurrenciesAvailable.getCurrenciesFromPoloniex()
currenciesPromise.then(data => {

  let currencies = data.data;
  let currencyCodes = Object.keys(data.data)

  for(var i=0;i<currencyCodes.length;i++){
    let key = currencyCodes[i]
    let currencie = currencies[key]

    if(currencie.disabled == 0 && currencie.delisted == 0 && currencie.frozen == 0 && key != 'BTC'){

      var timeStamp = String(Math.floor(Date.now() / 1000));

      const parametros = {
        TableName: t.currencies,
        Item: {
          'currencyPair': {S: "BTC_"+currencyCodes[i]},
          'timestamp': {S: timeStamp}
        }
      }

      const promise = WriteData.insertData(parametros)
      promise.then(data => {
        logger.info('In write data ejemplo, ', data.mensaje_respuesta)
      }, err => {
        logger.error('In write data ejemplo, ', err.mensaje_respuesta)
      })

    }

  }

}, err => {
  logger.error(err)
})
