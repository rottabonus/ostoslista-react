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

// INSERT INTO order_row ( quantity, gr_id, shop_id )  VALUES (?, ?, (SELECT shop_id FROM shoppinglist WHERE resolved = 'N'));

shopRouter.post('/', (request, response) => {
  const body = request.body
  const newItem = {
    quantity: body.quantity,
    gr_id: body.gr_id
  }

  db.query('INSERT INTO order_row (quantity, gr_id, shop_id) VALUES ('
    +db.escape(newItem.quantity)+', '+db.escape(newItem.gr_id)+
    ", (SELECT shop_id FROM shoppinglist WHERE resolved = 'N'))", 
    function (err, results) {
    if(err) throw err
    response.json(results.insertId)
  })
})

shopRouter.delete('/:id', (request, response) => {
  const id = request.params.id

  db.query('delete from order_row where or_id = ?', [id], function (err, results) {
    if(err) throw err
    response.json(results)
  })
})

shopRouter.put('/:id', (request, response) => {
  const quantity = request.body.quantity
  const id = request.params.id

  db.query('update order_row SET quantity = ? WHERE or_id = ?', [quantity, id],
    function (err, results) {
      if (err){
        console.log('Something went wrong:', err)
        response.status(404).end()
      }
      console.log('Updated')
      response.json(results)
    })
})

shopRouter.post('/resolve', (request, response) => {
  if (request.body.length !== 0){
      response.status(404).end
  }
db.query("update shoppinglist set resolved ='Y' WHERE resolved ='N'",
  function (err, results) {
    if (err){
      console.log('Something went wrong:', err)
      response.status(404).end()
    }
    console.log('Updated')
    response.json(results)
  })  
})
  


module.exports = shopRouter