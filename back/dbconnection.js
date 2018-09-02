const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'DATABASE_URL',
  user: 'DATABSE_USER',
  password: 'DATABASE_PW',
  database: 'DATABASE'
})


/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'shopper',
    password: 'f-4!adA3!2s+S6Juis#234fg',
    database: 'mkatushopping'
});*/


module.exports = pool
