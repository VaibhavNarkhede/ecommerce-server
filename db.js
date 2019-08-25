const mysql = require('mysql2')

function createPool() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ecommerce',
        waitForConnections: true,
        connectionLimit: 100,        
        queueLimit: 0
    })

    return pool
}

const pool = createPool()

module.exports = {
    connection: pool
}