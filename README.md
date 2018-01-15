<p align="center">
  <img src="https://lh3.googleusercontent.com/-kuZK_9RjH3Q/WluTIhi6yWI/AAAAAAAAAa4/3-lNezXWLEM6E2GZjJ7VC2Bn1YJ-tIYewCJoC/w530-h117-n/stacksavings.png" alt="" width=370 height=80>
  </br>
  <a href="https://site.stacksavings.com/"><strong>Visit our homepage »</strong></a>
</p>

# Stacksavings - DynamoDB Client

Hemos creado un paquete <b>"@stacksavings/dynamodb"</b> para poder usar los metodos de interacción con la bade de datos DynamoDB.

## Table of contents

- [Installing](#Installing)
- [Usage](#Installing)
- [Methods](#Installing)

## Getting Started

### Installing
Para poder instalar el cliente solo basta con ejecutar el comando:
```
npm i @stacksavings/dynamodb
```
### Usage
Para empezar a usarlo solo debe de incluirlo en tu código asi:
```
const dynamoDB = require('@stacksavings/dynamodb')
```
### Methods

* <b>currenciesAvailable:</b>

<p>&nbsp;&nbsp;&nbsp;&nbsp;Returns information about currencies.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Example to call it:</b>

```
const logger = require('@stacksavings/utils').log()
const client = require(@stacksavings/poloniex-client)
const currencies = client.currenciesAvailable()

currencies.then(data => {
  logger.info(data);
}, err => {
  logger.error(err);
})
```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Output:</b>
```
{
  "1CR":{
         "maxDailyWithdrawal":10000,
         "txFee":0.01,
         "minConf":3,
         "disabled":0
        },
  "ABY":{
         "maxDailyWithdrawal":10000000,
         "txFee":0.01,
         "minConf":8,
         "disabled":0
        },
   ...
}
```
* <b>returnChartData:</b>
<p>&nbsp;&nbsp;&nbsp;&nbsp;Returns candlestick chart data. Required GET parameters are "currencyPair", "period" (candlestick period in seconds; valid values are 300, 900, 1800, 7200, 14400, and 86400), "start", and "end". "Start" and "end" are given in UNIX timestamp format and used to specify the date range for the data returned.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Example to call it:</b>

```
const logger = require('@stacksavings/utils').log()
const client = require('./poloniex-client')
const TimeStamp = require('@stacksavings/utils')

let parameters = {
  currencyPair: "BTC_LTC",
  period: 14400,
  start: TimeStamp.toTimeStampUnix(20171218),
  end: TimeStamp.toTimeStampUnix(20171219)
}

const ChartData = client.returnChartData(parameters)
ChartData.then(data => {
  logger.info(data);
}, err => {
  logger.error(err);
})
```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Output:</b>
```
[
  {
    "date":1405699200,
    "high":0.0045388,
    "low":0.00403001,
    "open":0.00404545,
    "close":0.00427592,
    "volume":44.11655644,
    "quoteVolume":10259.29079097,
    "weightedAverage":0.00430015
  },
  ...
]
```
### Creators

<b>Stacksavings</b>
* <a href="https://site.stacksavings.com">https://site.stacksavings.com</a>

</br>

<b>David Molina</b>
* <a href="https://dmolina101.github.io">https://dmolina101.github.io</a>
