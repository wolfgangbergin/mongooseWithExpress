require('./wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const wolf1 = `/`
const wolf2 = `/products`
const wolf3 = wolf1 && wolf2

l(wolf3)

mongoose
  .connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
  .catch((err) => console.error('Could not connect to MongoDB...🤬🤬🤬', err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get(wolf3, async (req, res) => {
  const products = await Product.find({})
  console.log(products)
  res.send('All products will be here!')
})

app.listen(3000, () => {
  l('listening on port 3000')
})
