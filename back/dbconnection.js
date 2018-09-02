const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DATABASE_URL,
  user: process.env.DATABSE_USER,
  password: process.env.DATABASE_PW,
  database: process.env.DATABASE
})


/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'shopper',
    password: 'f-4!adA3!2s+S6Juis#234fg',
    database: 'mkatushopping'
});*/


module.exports = pool
