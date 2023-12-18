require('./wolf')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')
const asyncError = require('./asyncError/asyncError')
const ExpressError = require('./utils/ExpressError')
const ejsMate = require('ejs-mate')
const farmRoutes = require('./routes/farms')
const productRoutes = require('./routes/products')


mongoose
  .connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() =>
    console.log('Connected to MongoDB...🏁🏁🏁')
  )
  .catch((err) =>
    console.error(
      'Could not connect to MongoDB...🤬🤬🤬',
      err
    )
  )

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use('/farms', farmRoutes)

app.use('/products', productRoutes)


// product routes

app.get(
  '/products',
  asyncError(async (req, res, next) => {
    const { query } = req

    const products = await Product.find(query)

    res.render('products/index', { products, query })
  })
)

app.get('/products/new', (req, res, next) => {
  res.render('products/new')
})

app.get(
  '/products/:_id',
  asyncError(async (req, res, next) => {
    const product = await Product.findById(
      req.params._id
    ).populate('farm')

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
  '/products/:_id/edit',
  asyncError(async (req, res, next) => {
    const product = await Product.findById(
      req.params._id
    )
    res.render('products/edit', { product })
  })
)

app.put(
  '/products/:_id',
  asyncError(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(
      req.params._id,
      req.body,
      { runValidators: true, new: true }
    )
    res.redirect(`/products`)
  })
)

app.get(
  '/products/:_id/delete',
  asyncError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(
      req.params._id
    )
    res.redirect(`/products`)
  })
)

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found🥜🥜', 404))
})

app.use((err, req, res, next) => {
  !err.message &&
    (err.message = 'Something went wrong')
  !err.statusCode && (err.statusCode = 515)
  res.status(err.statusCode).render('error', { err })
})

app.listen(3000, () => {
  l('listening on port 3000')
})
