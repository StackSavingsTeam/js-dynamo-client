<p align="center">
  <img src="https://lh3.googleusercontent.com/-kuZK_9RjH3Q/WluTIhi6yWI/AAAAAAAAAa4/3-lNezXWLEM6E2GZjJ7VC2Bn1YJ-tIYewCJoC/w530-h117-n/stacksavings.png" alt="" width=370 height=80>
  </br>
  <a href="https://site.stacksavings.com/"><strong>Visit our homepage »</strong></a>
</p>

# Stacksavings - DynamoDB Client

Hemos creado un paquete <b>"@stacksavings/dynamodb"</b> para poder usar los metodos de interacción con la bade de datos DynamoDB.

## Table of contents

- [Prerrequisitos](#Installing)
- [Instalando](#Installing)
- [Uso](#Installing)
- [Métodos](#Installing)

## Getting Started

### Prerrequisitos
Cree un archivo de credenciales en ~/.aws/credentials en Mac/Linux o bien en C:\Users\USERNAME\.aws\credentials en Windows.
```
[default]

aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
region = your_region
```

### Instalando
Para poder instalar el cliente solo basta con ejecutar el comando:
```
npm i @stacksavings/dynamodb
```
### Uso
Para empezar a usarlo solo debe de incluirlo en tu código asi:
```
var dynamoDB = require('@stacksavings/dynamodb')
    dynamoDB = new dynamoDB()
```

Tambien se puede configurar el <b>endpoint</b> de la Base de Datos para que apunte a una instancia local o remota. Por defecto el endpoint esta local por el puerto <b>8000</b>.
```
[Instancia local]

var dynamoDB = require('@stacksavings/dynamodb')
    dynamoDB = new dynamoDB({endpoint: 'http://localhost:8000'})
```

```
[Instancia remota]

var dynamoDB = require('@stacksavings/dynamodb')
      dynamoDB = new dynamoDB({endpoint: 'https://ec2.ap-southeast-1.amazonaws.com'})
```
<br>
Si tienes algun problema con dicho puerto puedes obtener una lista completa de opciones de tiempo de ejecución de DynamoDB, incluida -port, escriba este comando:

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -help
```
<br>
Otra configuración es <b>region</b>, por defecto es 'us-east-1' pero puedes costumizarlo de la siguiente manera:

```
var dynamoDB = require('@stacksavings/dynamodb')
      dynamoDB = new dynamoDB({region: 'us-east-2'})
```
<br>
Este es un ejemplo junto otros parametros:

```
var dynamoDB = require('@stacksavings/dynamodb')
      dynamoDB = new dynamoDB({
                               endpoint: 'https://ec2.ap-southeast-1.amazonaws.com',
                               region: 'us-east-2'
                             })
```

### Métodos

* <b>createTable:</b>

<p>&nbsp;&nbsp;&nbsp;&nbsp;Crea una nuva tabla en la Base de Datos.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Ejemplo de como emplearlo:</b>

```
var dynamoDB = require('@stacksavings/dynamodb')
    dynamoDB = new dynamoDB()
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

const promise = dynamoDB.createTable(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Salida:</b>
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

<p>&nbsp;&nbsp;&nbsp;&nbsp;Crea un nuevo registro en una tabla existente.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Ejemplo de como emplearlo:</b>

```
const uuid = require('uuid')
var dynamoDB = require('@stacksavings/dynamodb')
    dynamoDB = new dynamoDB()
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
&nbsp;&nbsp;&nbsp;&nbsp;<b>Salida:</b>
```
{
  code: true,
  message: "Insert success!"
}
```
* <b>insertItemsBath:</b>
<p>&nbsp;&nbsp;&nbsp;&nbsp;Crea multiples registros en una tabla existente.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Ejemplo de como emplearlo:</b>

```
const uuid = require('uuid')
var dynamoDB = require('@stacksavings/dynamodb')
    dynamoDB = new dynamoDB()
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
&nbsp;&nbsp;&nbsp;&nbsp;<b>Salida:</b>
```
{
  code: true,
  message: "Insert success!"
}
```

* <b>scanItems:</b>
<p>&nbsp;&nbsp;&nbsp;&nbsp;Retorna uno o varios elementos de la tabla con sus atributos accediendo a cada registro de la misma.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Ejemplo de como emplearlo:</b>

```
var dynamoDB = require('@stacksavings/dynamodb')
    dynamoDB = new dynamoDB()
const logger = require('@stacksavings/utils').log()

const parameters = {
  TableName: 'Test',
  AttributesToGet: [ "currencyPair", "id", ... ]
}

const promise = dynamoDB.scanItems(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})

```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Salida:</b>
```
{
  code: true,
  message: "Scan done!",
  Items: <Field data>
}
```
* <b>getItems:</b>
<p>&nbsp;&nbsp;&nbsp;&nbsp;Busca registros con el valor de del campo llave o campo primario.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Ejemplo de como emplearlo:</b>

```
var dynamoDB = require('@stacksavings/dynamodb')
    dynamoDB = new dynamoDB()
const logger = require('@stacksavings/utils').log()

const parameters = {
      TableName: "Test",
      ProjectionExpression: "currencyPair",
      ExpressionAttributeNames:{
          "#id": "id"
      },
      ExpressionAttributeValues: {
        ':id': '1cedd7a0-fa26-11e7-81e3-23cdc36fe8fb'
      },
      KeyConditionExpression: '#id = :id'
    }

const promise = dynamoDB.getItems(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})

```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Salida:</b>
```
{
  code: true,
  message: "Query done!",
  Items: <Field data>
}
```

* <b>deleteTable:</b>
<p>&nbsp;&nbsp;&nbsp;&nbsp;Borra una tabla de la Base de Datos.</p>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Ejemplo de como emplearlo:</b>

```
var dynamoDB = require('@stacksavings/dynamodb')
    dynamoDB = new dynamoDB()
const logger = require('@stacksavings/utils').log()

const parameters = {
  TableName: "Test"
}

const promise = dynamoDB.deleteTable(parameters)
promise.then(data => {
  logger.info(data)
}, err => {
  logger.error(err)
})
```
&nbsp;&nbsp;&nbsp;&nbsp;<b>Salida:</b>
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

</br>

<b>Hendrix Roa</b>
* <a href="https://hendrixroa.github.io">Site hendrixroa</a>
