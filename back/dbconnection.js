const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'bce0892c48c863:d3af6c10',
  password: 'd3af6c10',
  database: 'heroku_95f2a39531c6609'
});

connection.connect((err) => {
  if (err){
    console.log('Error connecting to database')
    return;
  }
  console.log('Connected to mysql!');
});

module.exports = connection
