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

brandsRouter.post('/', (request, response) => {
  const body = request.body

  if(body.name === undefined){
    return response.status(400).json({ error: 'name missing'})
  }
  const brand = {name: body.name}

  db.query('insert into brand SET ?', brand, function (error, results, fields) {
    if(error){
      console.log('Something went wrong:', error)
      response.status(404).end()
    }
    response.json(results)
  })
})

module.exports = brandsRouter
