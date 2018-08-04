const categoryRouter = require('express').Router()
const db = require('../dbconnection')
const morgan = require('morgan')

categoryRouter.use(morgan(':method :url :body :status :res[content-length] :res[header] :response-time ms'))
morgan.token('body', function (request, response) {
    return JSON.stringify(request.body)})

categoryRouter.get('/', (request, response) => {
    db.query('select * from category', (err, rows) => {
        if(err){
            console.log('Something went wrong: ', err)
            response.status(404).end()
        }
        console.log('Data received')
        response.json(rows)
    })
})

categoryRouter.post('/', (request, response) => {
  const name = request.body.name

  db.query('insert into category SET name = ?', name, function (err, results) {
    if(err) throw err;
    response.json(results)
  })
})

categoryRouter.delete('/:id', (request, response) => {
  const id = request.params.id

  db.query('delete from category where cat_id = ?', [id], function (err, results) {
    if(err) throw err;
    response.json(results)
  })
})

module.exports = categoryRouter
