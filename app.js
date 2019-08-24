// app.js
// import modules
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// import restaurant.json
const restaurant_list = require('./restaurant.json')


// setting template engine
app.engine('handlebars', exphbs('defaultLayout: main'))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurant_list.results })
})

// route setting for show: using params
app.get('/restaurants/:id', (req, res) => {
  let restaurant = restaurant_list.results.find(restaurant => restaurant.id.toString() === req.params.id)
  console.log(restaurant)
  res.render('show', { restaurant: restaurant })
})

// route setting for search: query string
app.get('/search', (req, res) => {
  const restaurants = restaurant_list.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  const keyword = req.query.keyword
  res.render('index', { restaurantList: restaurants, keyword: keyword })
})

// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})

