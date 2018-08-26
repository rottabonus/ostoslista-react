const shopRouter = require('express').Router()
const db = require('../dbconnection')
const morgan = require('morgan')

shopRouter.use(morgan(':method :url :body :status :res[content-length] :res[header] :response-time ms'))
morgan.token('body', function (request, response) {
  return JSON.stringify(request.body)})

shopRouter.get('/', (request, response) => {
  db.query('SELECT a.or_id, a.quantity, c.name, b.date \n' +
      'FROM order_row a \n' +
      'INNER JOIN shoppinglist b \n' +
      'ON a.shop_id = b.shop_id \n' +
      'INNER JOIN groceries c \n' +
      'ON c.gr_id = a.gr_id\n' +
      'WHERE b.resolved = \'N\';', (err, results) => {
    if(err){
      console.log('Something went wrong: ', err)
      response.status(404).end()
    }
    console.log('Data received')
    response.json(results)
  })
})

shopRouter.get('/:id', (request, response) => {
  const id = request.params.id
  db.query('SELECT a.or_id, a.quantity, c.name, b.date \n' +
      'FROM order_row a \n' +
      'INNER JOIN shoppinglist b \n' +
      'ON a.shop_id = b.shop_id \n' +
      'INNER JOIN groceries c \n' +
      'ON c.gr_id = a.gr_id\n' +
      'WHERE a.shop_id = ?', [id], function (err, results) {
    if (err){
      console.log('Something went wrong: ', err)
      response.status(404).end()
    }
    console.log('Data received')
    response.json(results)
  })
})

module.exports = shopRouter