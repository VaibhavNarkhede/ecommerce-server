const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto')

router.post('/hash', (request, response) => {
    const key = 'DHF7q9VM'
    const salt = 'Lv4tWv2CVZ'
    const {txnid, amount, pinfo, fname, email, udf5} = request.body

    const cryp = crypto.createHash('sha512');
    const text = key+'|'+txnid+'|'+amount+'|'+pinfo+'|'+fname+'|'+email+'|||||'+udf5+'||||||'+salt;
    console.log(text)
	cryp.update(text);
    const hash = '' + cryp.digest('hex');
    console.log(hash)
    //response.end('' + hash)    
    const error = ''
    response.send(utils.createResponse(error,'' + hash))
})

router.get('/', (request,response) => {    
    const userId = request.userId
    const statement = `select cart.*, item.title as title, item.description as description
    from cart, item where (cart.itemid = item.id) and (userId = ?)`

    db.connection.query(statement, [userId], (error, categories) => {
        response.send(utils.createResponse(error,categories))
    })
})


router.delete('/:cartItemId', (request,response) => {    
    const id = request.params.cartItemId        
    const statement = `delete from cart where id = ?`
    
    db.connection.query(statement, [id], (error, categories) => {
        response.send(utils.createResponse(error,categories))
    })
})

router.delete('/', (request,response) => {    
    const userId = request.userId   
    console.log(userId)
    const statement = `delete from cart where userId = ?`
    
    db.connection.query(statement, [userId], (error, categories) => {
        response.send(utils.createResponse(error,categories))
    })
})


router.post('/', (request,response) => {    
    const {itemid, price, quantity}  = request.body
    const userId = request.userId
    const statement = `insert into cart (userId, itemid, price, quantity) values (?, ?, ?, ?)`
    db.connection.query(statement, [userId, itemid, price, quantity], (error, categories) => {
        response.send(utils.createResponse(error,categories))
    })
})

module.exports = router

