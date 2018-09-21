const categoryRouter = require('express').Router()
const db = require('../dbconnection')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const { verifyToken } = require('./token')

categoryRouter.use(morgan(':method :url :body :status :res[content-length] :res[header] :response-time ms'))
morgan.token('body',  (request, response) => {
  return JSON.stringify(request.body)})

categoryRouter.get('/', (request, response) => {
  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('select * from category', (err, rows) => {
      connection.release()
      if(err){
        console.log('Something went wrong: ', err)
        response.status(404).end()
      }
      console.log('Data received')
      response.json(rows)
    })
  })
})


categoryRouter.get('/:id', (request, response) => {
  const id = request.params.id
  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('select * from `category` WHERE `cat_id` = ?', [id], (err, results) => {
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


categoryRouter.post('/', (request, response) => {
  const name = request.body.name
  const token = verifyToken(request, response)
  const decodedToken = jwt.verify(token, 'shhhhh')

  if (!token || !decodedToken.username) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  db.getConnection((err, connection) => {
    if (err) throw err
    connection.query('insert into category SET name = ?', name, (err, results) => {
      connection.release()
      if(err) throw err
      response.json(results)
    })
  })
})


categoryRouter.put('/:id', (request, response) => {
  const name = request.body.name
  const id = request.params.id
  const token = verifyToken(request, response)
  const decodedToken = jwt.verify(token, 'shhhhh')

  if (!token || !decodedToken.username) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('update category SET name = ? WHERE cat_id = ?', [name, id],
      (err, results) => {
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


categoryRouter.delete('/:id', (request, response) => {
  const id = request.params.id
  const token = verifyToken(request, response)
  const decodedToken = jwt.verify(token, 'shhhhh')

  if (!token || !decodedToken.username) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('delete from category where cat_id = ?', [id], (err, results) => {
      connection.release()
      if(err) throw err
      response.json(results)
    })
  })
})


module.exports = categoryRouter
