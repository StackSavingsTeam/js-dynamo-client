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

* <b>createTable:</b>

<p>&nbsp;&nbsp;&nbsp;&nbsp;Create a new table in the database.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Example to call it:</b>

```
const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()

const parameters = {
  TableName: "Test",
  KeySchema: [
              { AttributeName: "id", "KeyType": "HASH" }
    ],
  AttributeDefinitions: [
      { AttributeName: "id", "AttributeType": "S" }
    ],
  ProvisionedThroughput: {
      "ReadCapacityUnits": 100,
      "WriteCapacityUnits": 100
  }
}

const promise = dynamoDB.createTable(parametros)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Output:</b>
```
{
  code: true,
  message: "Table <TABLE NAME> created!",
  data: {
         "TableDescription":{
           "AttributeDefinitions":[
             {
              "AttributeName":"id",
              "AttributeType":"S"
             }
           ],
           "TableName":"Test",
           "KeySchema":[
           {
             "AttributeName":"id",
             "KeyType":"HASH"
           }
          ],
          "TableStatus":"CREATING",
          "CreationDateTime":"2018-01-15T00:47:17.262Z",
          "ProvisionedThroughput":{
            "NumberOfDecreasesToday":0,
            "ReadCapacityUnits":100,
            "WriteCapacityUnits":100
          },
          "TableSizeBytes":0,
          "ItemCount":0,
          "TableArn":"arn:aws:dynamodb:us-east-1:281171835363:table/Test",
          "TableId":"21f71a7a-dbc6-486a-b1ab-194f5944387c"
        }
      }
}
```
* <b>insertItems:</b>

<p>&nbsp;&nbsp;&nbsp;&nbsp;Create a new record in an existing table.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Example to call it:</b>

```
const uuid = require('uuid')
const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()

var timeStamp = String(Math.floor(Date.now() / 1000));
const parameters = {
  TableName: "Test",
  Item: {
      id: uuid.v1(),
      currencyPair: "BTC_ETH",
      timestamp: timeStamp
  }
}

const promise = dynamoDB.insertItems(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Output:</b>
```
{
  code: true,
  message: "Insert success!"
}
```
* <b>insertItemsBath:</b>
<p>&nbsp;&nbsp;&nbsp;&nbsp;Create multiple records in an existing table.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Example to call it:</b>

```
'use strict'

const uuid = require('uuid')
const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()

var timeStamp = String(Math.floor(Date.now() / 1000));
const parameters = {
  RequestItems: {
      "Test": [
          {
            PutRequest: {
              Item: {
                  id: uuid.v1(),
                  currencyPair: "BTC_ETH",
                  timestamp: timeStamp
              }
            }
          },
          {
            PutRequest: {
              Item: {
                  id: uuid.v1(),
                  currencyPair: "BTC_ETH2",
                  timestamp: timeStamp
              }
            }
          },
          ...
        ]
  }
}

const promise = dynamoDB.insertItemsBath(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})

```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Output:</b>
```
{
  code: true,
  message: "Insert success!"
}
```

* <b>deleteTable:</b>
<p>&nbsp;&nbsp;&nbsp;&nbsp;Delete a table from database.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Example to call it:</b>

```
const dynamoDB = require('@stacksavings/dynamodb')
const logger = require('@stacksavings/utils').log()

const parameters = {
  TableName: "Test"
}

const promise = dynamoDB.deleteTable(parametros)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Output:</b>
```
{
  code: true,
  message: "Table <TABLE NAME> deleted!",
  data: {
         "TableDescription":{
           "TableName":"Test",
           "TableStatus":"DELETING",
           "ProvisionedThroughput":{
             "NumberOfDecreasesToday":0,
             "ReadCapacityUnits":100,
             "WriteCapacityUnits":100
           },
           "TableSizeBytes":0,
           "ItemCount":0,
           "TableArn":"arn:aws:dynamodb:us-east-1:281171835363:table/Test",
           "TableId":"21f71a7a-dbc6-486a-b1ab-194f5944387c"
         }
        }
}
```
### Creators

<b>Stacksavings</b>
* <a href="https://site.stacksavings.com">https://site.stacksavings.com</a>

</br>

<b>David Molina</b>
* <a href="https://dmolina101.github.io">https://dmolina101.github.io</a>
