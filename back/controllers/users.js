const loginRouter = require('express').Router()
const db = require('../dbconnection')
const morgan = require('morgan')
const bcrypt = require('bcrypt')


loginRouter.use(morgan(':method :url :body :status :res[content-length] :res[header] :response-time ms'))
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)})


loginRouter.post('/signup', (request, response) => {
  const body = request.body
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(body.password, salt)
  const newUser = {
    username: body.username,
    password: hash
  }

  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('insert into users SET ?', newUser, (err, results) => {
      connection.release()
      if(err) throw err
      response.json(results.insertId)
    })
  })
})


loginRouter.post('/login', (request, response) => {
  const body = request.body
  const user = {
    username: body.username,
    password: body.password
  }

  db.getConnection((err, connection) => {
    if(err) throw err
    connection.query('select * from users WHERE username = ?', [user.username], (err, results) => {
      connection.release()
      if(err){
        throw err
      } else {
        if (results.length > 0) {
          bcrypt.compare(user.password, results[0].password, (err, res) => {
            if ( !(res) ) {
              response.send({ 'code': 204, 'success': 'username or password does not match' })
            } else {
              response.send({ 'code': 200, 'success': 'login successfull' })
            }
          })
        } else {
          response.send({ 'code': 204, 'success': 'username or password does not match' })
        }
      }
    })
  })
})

/*db.getConnection(function (err, connection) {
    if(err) throw err
    connection.query('select * from users WHERE username = ?', [user.username], function (err, results) {
      connection.release()
      if(err){
        throw err
      } else {
        if (results.length > 0) {
          if (results[0].password === user.password) {
            response.send({ 'code': 200, 'success': 'login successfull' })
          } else {
            response.send({ 'code': 204, 'success': 'username or password does not match' })
          }
        } else {
          response.send({ 'code': 204, 'success': 'username or password does not match' })
        }
      }
    })
  })
})*/


module.exports = loginRouter