const shopRouter = require('express').Router()
const db = require('../dbconnection')
const morgan = require('morgan')

shopRouter.use(morgan(':method :url :body :status :res[content-length] :res[header] :response-time ms'))
morgan.token('body', function (request, response) {
  return JSON.stringify(request.body)})

shopRouter.get('/', (request, response) => {
  db.getConnection(function (err, connection) {
    if(err) throw err
    connection.query('select a.or_id, g.name, a.quantity, b.name as brand, c.name as category, g.price\n' +
          'FROM order_row a \n' +
          'INNER JOIN shoppinglist s ON s.shop_id=a.shop_id \n' +
          'INNER JOIN groceries g ON g.gr_id=a.gr_id \n' +
          'INNER JOIN brand b ON b.brand_id=g.brand_id \n ' +
          'INNER JOIN category c ON c.cat_id=g.cat_id \n' +
          'WHERE s.resolved = \'N\'', (err, results) => {
      connection.release()
      if(err){
        console.log('Something went wrong: ', err)
        response.status(404).end()
      }
      console.log('Data received')
      response.json(results)
    })
  })
})

shopRouter.get('/history', (request, response) => {
  db.getConnection(function (err, connection) {
    if(err) throw err
    connection.query('select shop_id, date, resolved FROM shoppinglist', (err, results) => {
      connection.release()
      if(err){
        console.log('Something went wrong: ', err)
        response.status(404).end()
      }
      console.log('Data received')
      response.json(results)
    })
  })
})


shopRouter.get('/:id', (request, response) => {
  const id = request.params.id
  db.getConnection(function (err, connection) {
    if(err) throw err
    connection.query('select a.or_id, g.name, a.quantity, b.name as brand, c.name as category, g.price\n' +
            'FROM order_row a \n' +
            'INNER JOIN shoppinglist s ON s.shop_id=a.shop_id \n' +
            'INNER JOIN groceries g ON g.gr_id=a.gr_id \n' +
            'INNER JOIN brand b ON b.brand_id=g.brand_id \n ' +
            'INNER JOIN category c ON c.cat_id=g.cat_id \n' +
            'WHERE a.shop_id = ?', [id], function (err, results) {
      connection.release()
      if (err){
        console.log('Something went wrong: ', err)
        response.status(404).end()
      }
      console.log('Data received')
      response.json(results)
    })
  })
})


// INSERT INTO order_row ( quantity, gr_id, shop_id )  VALUES (?, ?, (SELECT shop_id FROM shoppinglist WHERE resolved = 'N'));

shopRouter.post('/', (request, response) => {
  const body = request.body
  const newItem = {
    quantity: body.quantity,
    gr_id: body.gr_id
  }

  db.getConnection(function (err, connection) {
    if(err) throw err
    connection.query('INSERT INTO order_row (quantity, gr_id, shop_id) VALUES ('
          +connection.escape(newItem.quantity)+', '+connection.escape(newItem.gr_id)+
          ', (SELECT shop_id FROM shoppinglist WHERE resolved = \'N\'))',
    function (err, results) {
      connection.release()
      if(err) throw err
      response.json(results.insertId)
    })
  })
})


shopRouter.delete('/:id', (request, response) => {
  const id = request.params.id

  db.getConnection(function (err, connection) {
    if(err) throw err
    connection.query('delete from order_row where or_id = ?', [id], function (err, results) {
      connection.release()
      if(err) throw err
      response.json(results)
    })
  })
})


shopRouter.put('/:id', (request, response) => {
  const quantity = request.body.quantity
  const id = request.params.id

  db.getConnection(function (err, connection) {
    if (err) throw err
    connection.query('update order_row SET quantity = ? WHERE or_id = ?', [quantity, id],
      function (err, results) {
        connection.release()
        if (err){
          console.log('Something went wrong:', err)
          response.status(404).end()
        }
        console.log('Updated')
        response.json(results)
      })
  })
})


shopRouter.post('/resolve', (request, response) => {

  db.getConnection(function (err, connection) {
    if(err) throw err
    connection.query('update shoppinglist set resolved =\'Y\' WHERE resolved =\'N\'',
      function (err, results) {
        connection.release()
        if (err){
          console.log('Something went wrong:', err)
          response.status(404).end()
        }
        console.log('Updated')
        response.json(results)
      })
  })
})

shopRouter.post('/new', (request, response) => {
  const body = request.body
  const newItem = {
    date: body.date,
    resolved: body.resolved,
  }

  db.getConnection(function (err, connection) {
    if(err) throw err
    connection.query('insert into shoppinglist SET ?', newItem, function (err, results) {
      connection.release()
      if(err) throw err
      response.json(results.insertId)
    })
  })
})

module.exports = shopRouter