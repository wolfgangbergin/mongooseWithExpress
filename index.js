require('./wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')
const asyncError = require('./asyncError/asyncError')
const Farm = require('./models/farm')

mongoose
  .connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
  .catch((err) => console.error('Could not connect to MongoDB...🤬🤬🤬', err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// Farm routes

app.get(
  '/farms',
  asyncError(async (req, res, next) => {
    const farms = await Farm.find({})
    res.render('farms/index', { farms })
  })
)

app.get('/farms/new', (req, res) => {
  res.render('farms/new')
})

app.post(
  '/farms',
  asyncError(async (req, res, next) => {
    const newFarm = new Farm(req.body)
    await newFarm.save()
    res.redirect(`/farms`)
  })
)

app.get(
  '/farms/:id/delete',
  asyncError(async (req, res, next) => {
    const { id } = req.params
    const product = await Farm.deleteOne({ _id: id })
    res.redirect(`/farms`)
  })
)

app.get(
  '/farms/:id',
  asyncError(async (req, res, next) => {
    const { id } = req.params

    const farm = await Farm.findById(id)

    res.render('farms/show', { farm })
  })
)

app.get('/farms/:id/products/new',  asyncError(async (req, res, next) => {
  const { id } = req.params
  const farm = await Farm.findById(id)
  res.render('products/new', { categories, farm })
}))

// product routes
app.get(
  '/products',
  asyncError(async (req, res, next) => {
    const products = await Product.find(req.query ?? {})
    res.render('products/index', { products, ...req })
  })
)

app.get('/products/new', (req, res) => {
  res.render('products/new')
})

app.get(
  '/products/:id',
  asyncError(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/show', { product })
  })
)

app.post(
  '/products',
  asyncError(async (req, res, next) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products`)
  })
)
app.get(
  '/products/:id/edit',
  asyncError(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', { product })
  })
)

app.put(
  '/products/:id',
  asyncError(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products`)
  })
)

app.get(
  '/products/:id/delete',
  asyncError(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.deleteOne({ _id: id })
    res.redirect(`/products`)
  })
)

app.delete(
  '/products/:id',
  asyncError(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    res.redirect(`/products`)
  })
)

app.use('/*', (err, req, res, next) => {
  res.send(err)
})

app.listen(3000, () => {
  l('listening on port 3000')
})
