const groceriesRouter = require('express').Router()
const db = require('../dbconnection')
const morgan = require('morgan')

groceriesRouter.use(morgan(':method :url :body :status :res[content-length] :res[header] :response-time ms'))
morgan.token('body', function (request, response) {
  return JSON.stringify(request.body)})

groceriesRouter.get('/', (request, response) => {
  db.query('select * from groceries', (err, results) => {
    if(err){
      console.log('Something went wrong: ', err)
      response.status(404).end()
    }
    console.log('Data received')
    response.json(results)
  })
})

groceriesRouter.get('/:id', (request, response) => {
  const id = request.params.id
  db.query('select * from `groceries` WHERE `gr_id` = ?', [id], function (err, results) {
    if (err){
      console.log('Something went wrong: ', err)
      response.status(404).end()
    }
    console.log('Data received')
    response.json(results)
  })
})

groceriesRouter.post('/', (request, response) => {
  const body = request.body
  const newItem = {
    name: body.name,
    price: body.price,
    amount: body.amount,
    cat_id: body.cat_id,
    brand_id: body.brand_id
  }

  db.query('insert into groceries SET ?', newItem, function (err, results) {
    if(err) throw err
    response.json(results.insertId)
  })
})


groceriesRouter.put('/:id', (request, response) => {
  const body = request.body
  const id = request.params.id

  const item = {
    name: body.name,
    price: body.price,
    amount: body.amount,
    cat_id: body.cat_id,
    brand_id: body.brand_id
  }

  db.query('update groceries SET ? WHERE gr_id = ?', [item, id], function (err, results) {
    if (err){
      console.log('Something went wrong:', err)
      response.status(404).end()
    }
    console.log('Updated')
    response.json(results)
  })
})

groceriesRouter.delete('/:id', (request, response) => {
  const id = request.params.id

  db.query('delete from groceries where gr_id = ?', [id], function (err, results) {
    if(err) throw err
    response.json(results)
  })
})


module.exports = groceriesRouter
