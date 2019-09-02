const express = require('express')
const router = express.Router()
const crypto = require('crypto-js')
const db = require('../db')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')

//Signup from the user
router.post('/signup', (request, response) => {
    const {firstName, lastName, email, address, mobile, password} = request.body

    // encrypt the password
    const encryptedPassword = '' + crypto.SHA256(password)

    const statement = `insert into user (firstName, lastName, email, address, mobile, password) values (?, ?, ?, ?, ?, ?)`
    db.connection.query(statement,
            [firstName, lastName, email, address, mobile, encryptedPassword],
            (error, result) => {
                response.send(utils.createResponse(error, result))
            }
        )
})



//Signin from the user using email and password and creates token usingjwt token
router.post('/signin', (request, response) => {
    const {email, password} = request.body

    // encrypt the password
    const encryptedPassword = '' + crypto.SHA256(password)

    const statement = `select id, firstName, lastName from user where email = ? and password = ?`
    db.connection.query(statement,
            [email, encryptedPassword],
            (error, users) => {
                if(error) {
                    console.log(error)
                } else {
                    if (users.length == 0)
                    {
                        response.send(utils.createResponse('user does not exist'))
                    } else {
                        const user = users[0]
                        //Creates the token
                        const token = jwt.sign({id: user['id']}, config.secret)

                        const data = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: token
                        }

                        response.send(utils.createResponse(error, data))     
                    }        
                }                        
            }
        )
})

module.exports = router