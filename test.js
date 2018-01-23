const assert = require('chai').assert
const dynamo = require('./dynamoDB')

describe("Tests for DynamoDB", () => {
	
	describe(" test create", () =>{
		before(() => {
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
		})
	})
	

	after(() => {
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
		
})