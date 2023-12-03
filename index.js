require('./wolfgang')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')
const asyncError = require('./asyncError/asyncError')
const Farm = require('./models/farm')
const ejsMate = require('ejs-mate')

mongoose
  .connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() => console.log('Connected to MongoDB...🏁🏁🏁'))
  .catch((err) =>
    console.error('Could not connect to MongoDB...🤬🤬🤬', err)
  )

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// Farm routes

app.get(
  '/farms',
  asyncError(async (req, res) => {
    const farms = await Farm.find({})
    res.render('farms/index', { farms })
  })
)

app.get('/farms/new', (req, res) => {
  res.render('farms/new')
})
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

app.post(
  '/farms',
  asyncError(async (req, res) => {
    const newFarm = new Farm(req.body)
    await newFarm.save()
    res.redirect(`/farms`)
  })
)
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

app.post(
  '/farms/:_id',
  asyncError(async (req, res) => {
    l('//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//')
    const oldFarm = await Farm.findById(req.params._id)
    const newFarm = new Farm(req.body)

    oldFarm.products.forEach(async (product) => {
      const { name, price, category } = await Product.findById(
        product
      ).populate()

      const newProduct = new Product({
        name,
        price,
        category,
      })
      newFarm.products.push(newProduct)
      await newProduct.save()
      l('1')
    })
    await Farm.findByIdAndDelete(req.params._id)
     await Product.deleteMany({ _id: { $in: oldFarm.products } })
     l('2')
    await newFarm.save()
    res.redirect(`/farms`)
  })
)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

app.get(
  '/farms/:_id/delete',
  asyncError(async (req, res) => {
    const oldFarm = await Farm.findByIdAndDelete(req.params._id)
  
    await Product.deleteMany({ _id: { $in: oldFarm.products } })
    res.redirect(`/farms`)
  })
)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

app.get(
  '/farms/:_id/edit',
  asyncError(async (req, res) => {
    const farm = await Farm.findById(req.params._id)
    res.render('farms/edit', { farm })
  })
)
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

app.get(
  '/farms/:_id',
  asyncError(async (req, res) => {
    const farm = await Farm.findById(req.params._id).populate('products')

    res.render('farms/show', { farm })
  })
)

app.get(
  '/farms/:_id/products/new',
  asyncError(async (req, res) => {
    const farm = await Farm.findById(req.params._id)
    res.render('farms/newFarmProduct.ejs', { farm })
  })
)

app.post(
  '/farms/:_id/products',
  asyncError(async (req, res) => {
    const farm = await Farm.findById(req.params._id)
    const newProduct = new Product({ ...req.body })
    farm.products.push(newProduct)
    newProduct.farm = farm
    await newProduct.save()
    await farm.save()
    res.redirect(`/farms/${farm._id}`)
  })
)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

// product routes
app.get(
  '/products',
  asyncError(async (req, res) => {
    const products = await Product.find(req.query ?? {})
    res.render('products/index', { products, ...req })
  })
)

app.get('/products/new', (req, res) => {
  res.render('products/new')
})

app.get(
  '/products/:_id',
  asyncError(async (req, res) => {
    const product = await Product.findById(req.params._id).populate('farm')

    res.render('products/show', { product })
  })
)

app.post(
  '/products',
  asyncError(async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products`)
  })
)
app.get(
  '/products/:_id/edit',
  asyncError(async (req, res) => {
    const product = await Product.findById(req.params._id)
    res.render('products/edit', { product })
  })
)

app.put(
  '/products/:_id',
  asyncError(async (req, res) => {
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
  asyncError(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params._id)
    res.redirect(`/products`)
  })
)

// app.delete(
//   '/products/:_id',
//   asyncError(async (req, res) => {
//     const product = await Product.findByIdAndDelete(req.params._id)
//     res.redirect(`/products`)
//   })
// )

app.use((req, res, next) => {
  //res.send('error')
  // err.message = 'Something went wrong'
  // l(err.message)
  const err = new Error('wolf Not Found')
  err.statusCode = 404
  res.render('error', { err })
})

// app.use((err, req, res, next) => {

//   if (!err.message) {err.message = 'Something went wrong',
//   err.statusCode = 515}
//     res.status(err.statusCode).render('error', { err })
//   })

app.listen(3000, () => {
  l('listening on port 3000')
})
