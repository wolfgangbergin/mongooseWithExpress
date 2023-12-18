const express = require('express')
const router = express.Router()
const Farm = require('../models/farm')
const asyncError = require('../asyncError/asyncError')
const Product = require('../models/product')





router.get(
  '/',
  asyncError(async (req, res, next) => {
    const { query } = req

    const products = await Product.find(query)

    res.render('products/index', { products, query })
  })
)

router.get('/new', (req, res, next) => {
  res.render('products/new')
})

router.get(
  '/:_id',
  asyncError(async (req, res, next) => {
    const product = await Product.findById(
      req.params._id
    ).populate('farm')

    res.render('products/show', { product })
  })
)

router.post(
  '/',
  asyncError(async (req, res, next) => {
   
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products`)
  })
)
router.get(
  '/:_id/edit',
  asyncError(async (req, res, next) => {
    const product = await Product.findById(
      req.params._id
    )
    res.render('/edit', { product })
  })
)

router.put(
  '/:_id',
  asyncError(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(
      req.params._id,
      req.body,
      { runValidators: true, new: true }
    )
    res.redirect(``)
  })
)

router.get(
  '/:_id/delete',
  asyncError(async (req, res, next) => {

    l('jojjojo')
    const product = await Product.findByIdAndDelete(
      req.params._id
    )
    res.redirect(`/products`)
  })
)






module.exports = router