const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const utils = require('./utils')
const jwt = require('jsonwebtoken')
const config = require('./config')

// get all the routers
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const itemRouter = require('./routes/item')
const cartRouter = require('./routes/cart')

const app = express()

// Commented below lines becuase there is another way to do it. 

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
//     next();
//   });

//use this command "npm install cors" and add below line

//for cross origin..
//Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers 
//to tell a browser to let a web application running at one origin (domain) have permission 
//to access selected resources from a server at a different origin

app.use(cors('*'))

//getting the json and form-data from client
app.use(express.json()) //This is a built-in middleware function in Express. 
                        //It parses incoming requests with JSON payloads and is based on body-parser.

app.use(express.urlencoded({ extended: true })) //This is a built-in middleware function in Express. 
                                                //It parses incoming requests with urlencoded payloads and is based on body-parser.
// logging                                                
app.use(morgan('dev')) //HTTP request logger middleware for node.js.

//add the authorization
app.use((request, response, next) => {

    // check the open APIs

    if ((request.url == '/user/signup') ||
        (request.url == '/user/signin')) {

            // no token is required for these apis as these are open APIs  
            next()            
        }
        else
        {
            // protected apis
            const token = request.headers['x-auth-token']
            if (token) {
                try {
                    // check if the token is valid
                    const data =  jwt.verify(token, config.secret)
                    
                    // add the user id to the request
                    request.userId = data.id

                    // call the next (actual) api   
                    next()
                } catch(ex)
                {
                    console.log(ex)
                    response.send(utils.createResponse('invalid token'))
                }
            } else {
                //response.status = 401
                response.send(utils.createResponse('missing token'))
            }
        }    
})

// add the routers
app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/item', itemRouter)
app.use('/cart', cartRouter)

app.listen(4000, () => {
    console.log(`Server started on 4000`);
});