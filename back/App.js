const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const groceriesRouter = require('./controllers/groceries')
const brandsRouter = require('./controllers/brands')
const categoryRouter = require('./controllers/categories')
const cors = require('cors')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json())
app.use('/api/groceries', groceriesRouter)
app.use('/api/brands', brandsRouter)
app.use('/api/categories', categoryRouter)

app.get('/', (request, response) => {
  response.send('<h1>Welcome to shoppinglist /api/</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
