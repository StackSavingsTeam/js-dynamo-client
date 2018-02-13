const assert = require('chai').assert
const uuid = require('uuid')
const dynamoIncl = require('./dynamoDB')
const dynamo = new dynamoIncl({})
const timeStamp = String(Math.floor(Date.now() / 1000))

describe("Tests for DynamoDB", () => {
	const createTable = async(params)=> {
		const res = await dynamo.createTable(params).catch(err => console.log(err))
		assert.equal(true, res.code)
	}
    it('Should be create tabla in database', () => {
        const params = {
            TableName: 'TestDynamoDB',
            KeySchema: [{
                AttributeName: "fieldTest",
                "KeyType": "HASH"
            }],
            AttributeDefinitions: [{
                AttributeName: "fieldTest",
                "AttributeType": "S"
            }],
            ProvisionedThroughput: {
                "ReadCapacityUnits": 100,
                "WriteCapacityUnits": 100
            }
		}
		createTable(params)

    })


	const insertItem = async(params)=> {
        const res = await dynamo.insertItems(params).catch(err => console.log(err))
        assert.equal(true, res.code)
	}
    it('Should be Insert single a item in Table', () => {
        const params = {
            TableName: "TestDynamoDB",
            Item: {
                id: uuid.v1(),
                fieldTest: "This a field test",
                timeStamp: timeStamp
            }
		}
		insertItem(params)
    })

	const insertItemsBatch = async(params)=> {
		const res = await dynamo.insertItemsBath(params).catch(err => console.log(err))
		assert.equal(true, res.code)
	}
    it('Should be Insert items batch in Table', () => {
        const params = {
            RequestItems: {
                "TestDynamoDB": [{
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
		insertItemsBatch(params)
    })

	const scanItemsFromDatabase = (params)=> {
		const res = dynamo.scanItems(params).catch(err => console.log(err))

		res.then((res)=>{
			console.log(res.data.count)
			assert.isNumber(res.data.Count)
		})
	}
    it('Should be scan items from database', () => {
        const params = {
            TableName: 'TestDynamoDB',
            AttributesToGet: ["fieldTest"]
		}
		scanItemsFromDatabase(params)
    })

	const deleteTable = async(params)=> {
		const res =  await dynamo.deleteTable(params).catch(err => console.log(err))
		assert.equal(true, res.code)
	}
	it('Should be delete table', () =>{
		const params = {
			TableName: 'TestDynamoDB'
		}
		deleteTable(params)
	})
})