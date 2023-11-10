require('./wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')

mongoose
  .connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
  .catch((err) => console.error('Could not connect to MongoDB...🤬🤬🤬', err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/products', async (req, res) => {
  
  const { category } = req.query

  
const products = category? await Product.find({ category }) : await Product.find({})

  res.render('products/index', { products  })
})

app.get('/products', async (req, res) => {
  const products = await Product.find({})

  res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
  res.render('products/new')
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/show', { product })
})

app.post('/products', async (req, res) => {
  l(req.body)
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.redirect(`/products`)
})
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/edit', { product })
})

app.put('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  res.redirect(`/products`)
})

app.get('/products/:id/delete', async (req, res) => {
  const { id } = req.params
  const product = await Product.deleteOne({ _id: id })
  res.redirect(`/products`)
})
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findByIdAndDelete(id)
  res.redirect(`/products`)
})

// app.get('/products/kim', async (req, res) => {

//     const products = await Product.find({ category: 'meat' })
//     res.render('products/index', { products })
//   })

app.listen(3000, () => {
  l('listening on port 3000')
})
