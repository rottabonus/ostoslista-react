const brandsRouter = require('express').Router()
const db = require('../dbconnection')
const morgan = require('morgan')

brandsRouter.use(morgan(':method :url :body :status :res[content-length] :res[header] :response-time ms'))
morgan.token('body', function (request, response) {
  return JSON.stringify(request.body)})

brandsRouter.get('/', (request, response) => {
  db.query('select * from brand', (err, rows) => {
    if(err){
      console.log('Something went wrong: ', err)
      response.status(404).end()
    }
    console.log('Data received')
    response.json(rows)
  })
})

brandsRouter.get('/:id', (request, response) => {
  const id = request.params.id
  db.query('select * from `brand` WHERE `brand_id` = ?', [id], function (err, results) {
    if (err){
      console.log('Something went wrong: ', err)
      response.status(404).end()
    }
    console.log('Data received')
    response.json(results)
  })
})

brandsRouter.post('/', (request, response) => {
  const name = request.body.name

  if(name === undefined){
    return response.status(400).json({ error: 'name missing' })
  }

  db.query('insert into brand SET name = ?', name, function (err, results) {
    if(err){
      console.log('Something went wrong:', err)
      response.status(404).end()
    }
    response.json(results)
  })
})

brandsRouter.put('/:id', (request, response) => {
  const name = request.body.name
  const id = request.params.id

  db.query('update brand SET name = ? WHERE brand_id = ?', [name, id],
    function (err, results) {
      if (err){
        console.log('Something went wrong:', err)
        response.status(404).end()
      }
      console.log('Updated')
      response.json(results)
    })
})

brandsRouter.delete('/:id', (request, response) => {
  const id = request.params.id

  db.query('delete from brand where brand_id = ?', [id], function (err, results) {
    if(err) throw err
    response.json(results)
  })
})

module.exports = brandsRouter