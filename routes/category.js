const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.get('/', (request,response) => {    
    const statement = `select * from category`
    db.connection.query(statement, (error, categories) => {
        response.send(utils.createResponse(error,categories))
    })
})

module.exports = router

