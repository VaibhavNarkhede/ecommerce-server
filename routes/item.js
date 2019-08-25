const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.get('/category/:categoryId', (request, response) => {
    const categoryId = request.params.categoryId
    const statement = `select * from item where categoryId = ?`
    db.connection.query(statement, [ categoryId ], (error, categories) => {
        response.send(utils.createResponse(error, categories))
    })
})

module.exports = router
