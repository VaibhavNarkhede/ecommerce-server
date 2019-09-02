const mysql = require('mysql2')

function createPool() {
    const pool = mysql.createPool({
        host: '10.0.2.15',
        user: 'root',
        password: 'root',
        database: 'ecommerce',
        waitForConnections: true,
        connectionLimit: 100,
		port: 9090,	
        queueLimit: 0
    })

    return pool
}

const pool = createPool()

module.exports = {
    connection: pool
}