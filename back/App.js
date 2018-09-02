const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const groceriesRouter = require('./controllers/groceries')
const brandsRouter = require('./controllers/brands')
const categoryRouter = require('./controllers/categories')
const shopRouter = require('./controllers/shoppinglist')
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.json())
app.use('/api/groceries', groceriesRouter)
app.use('/api/brands', brandsRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/shoppinglist', shopRouter)

app.get('/', (request, response) => {
  response.send('<h1>Welcome to shoppinglist /api/</h1>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
