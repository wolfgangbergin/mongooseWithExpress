require('./wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')


const wolf1 = ``




mongoose
  .connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
  .catch((err) => console.error('Could not connect to MongoDB...🤬🤬🤬', err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/products' , async (req, res) => {
  const products = await Product.find({})
 
  res.render('products/index', { products })
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/show', { product })
})


app.listen(3000, () => {
  l('listening on port 3000')
})
