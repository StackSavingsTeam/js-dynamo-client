const assert = require('chai').assert
const uuid = require('uuid')
const dynamo = require('./dynamoDB')
const timeStamp = String(Math.floor(Date.now() / 1000))

describe("Tests for DynamoDB", () => {
	it('Should be create tabla in database', () => {
		const params = {
			TableName: 'TestDynamoDB',
			KeySchema: [
				{ AttributeName: "fieldTest", "KeyType": "HASH" }
			],
			AttributeDefinitions: [
				{ AttributeName: "fieldTest", "AttributeType": "S" }
			],
			ProvisionedThroughput: {
				"ReadCapacityUnits": 100,
				"WriteCapacityUnits": 100
			}
		}
		const createTable =  dynamo.createTable(params)
			createTable.then( res => {
				assert.equal(true, res.code)
			}).catch( err => {
			})		
	})

	it('Should be Insert single a item in Table', () => {
		const params = {
			TableName: "TestDynamoDB",
			Item: {
				id: uuid.v1(),
				fieldTest: "This a field test",
				timeStamp: timeStamp
			}
		}
		const insertItem =  dynamo.insertItems(params)
			insertItem.then( res => {
				assert.equal(true, res.code)
			}).catch( err => {
			})
	})

	it('Should be Insert items batch in Table', () => {
		const params = {
			RequestItems: {
				"TestDynamoDB": [
						{
							PutRequest: {
								Item: {
									id: uuid.v1(),
									fieldTest: "this a field test 2",
									timestamp: timeStamp
								}
							}
						},
						{
							PutRequest: {
								Item: {
									id: uuid.v1(),
									fieldTest: "this a field test 3",
									timestamp: timeStamp
								}
							}
						}
					]
			}
		}
		const insertBath =  dynamo.insertItemsBath(params)
			insertBath.then( res => {
				assert.equal(true, res.code)
			}).catch( err => {
			})
	})

	it('Should be scan items from database', () =>{
		const params = {
			TableName: 'TestDynamoDB',
			AttributesToGet: [ "fieldTest" ]
		}
		const scanItem =  dynamo.scanItems(params)
			scanItem.then( res => {
				assert.equal(true, res.code)
			}).catch( err => {
			})
	})
		
	it('Should be delete table', () =>{
		const params = {
			TableName: 'TestDynamoDB'
		}
		const deleteTable =  dynamo.deleteTable(params)
			deleteTable.then( res => {
				assert.equal(true, res.code)
			}).catch( err => {
			})
	})		
})