const groceriesRouter = require('express').Router()
const db = require('../dbconnection')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

groceriesRouter.use(morgan(':method :url :body :status :res[content-length] :res[header] :response-time ms'))
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)})

groceriesRouter.get('/', (request, response) => {
  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('select a.gr_id, a.name, b.name as brand, c.name as category, a.price, a.amount ' +
      'FROM groceries a ' +
      'INNER JOIN brand b ON b.brand_id=a.brand_id ' +
      'INNER JOIN category c ON c.cat_id = a.cat_id;', (err, results) => {
      connection.release()
      if (err) {
        console.log('Something went wrong: ', err)
        response.status(404).end()
      }
      console.log('Data received')
      response.json(results)
    })
  })
})


groceriesRouter.get('/:id', (request, response) => {
  db.getConnection((err, connection) => {
    if(err) throw err
    const id = request.params.id
    connection.query('select * from `groceries` WHERE `gr_id` = ?', [id], (err, results) => {
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


groceriesRouter.post('/', (request, response) => {
  const body = request.body
  const token = verifyToken(request, response)
  const decodedToken = jwt.verify(token, 'shhhhh')

  if (!token || !decodedToken.username) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const newItem = {
    name: body.name,
    price: body.price,
    amount: body.amount,
    cat_id: body.cat_id,
    brand_id: body.brand_id
  }

  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('insert into groceries SET ?', newItem, (err, results) => {
      connection.release()
      if(err) throw err
      response.json(results.insertId)
    })
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

  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('update groceries SET ? WHERE gr_id = ?', [item, id], (err, results) => {
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


groceriesRouter.delete('/:id', (request, response) => {
  const id = request.params.id

  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('delete from groceries where gr_id = ?', [id], (err, results) => {
      connection.release()
      if(err) throw err
      response.json(results)
    })
  })
})

const verifyToken = (req, res) => {
  const bearer = req.headers['authorization']
  if(bearer !== 'undefined'){
    const b = bearer.split(' ')
    const bToken = b[1]
    return bToken
  } else {
    res.status(401).send({ error: 'no authorization' })
  }
}



module.exports = groceriesRouter
