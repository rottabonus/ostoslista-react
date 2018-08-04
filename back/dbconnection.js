const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'shopper',
  password: 'f-4!adA3!2s+S6Juis#234fg',
  database: 'mkatushopping'
});

connection.connect((err) => {
  if (err){
    console.log('Error connecting to database')
    return;
  }
  console.log('Connected to mysql!');
});

module.exports = connection
