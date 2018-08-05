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

groceriesRouter.put('/:id', (request, response) => {
  const body = request.body

  const item = {
    name: body.name,
    price: body.price,
    amount: body.amount,
    id: request.params.id,
    category: body.cat_id,
    brand: body.brand_id
  }

  db.query('update groceries SET name = ?, amount = ?, price = ?, cat_id = ?, brand_id = ? WHERE gr_id = ?', [item.name, item.amount, item.price, item.category, item.brand, item.id],
    function (err, results) {
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
