const express = require('express')
const router = express.Router()
const Farm = require('../models/farm')
const asyncError = require('../asyncError/asyncError')
const Product = require('../models/product')

router.get('/', async (req, res, next) => {
  const farms = await Farm.find({})
  res.render('farms/index', { farms })
})

router.get('/new', (req, res, next) => {
  res.render('farms/new')
})

router.post(
  '/',
  asyncError(async (req, res, next) => {
    const newFarm = new wolf.Farm(req.body)
    await newFarm.save()
    res.redirect(`/farms`)
  })
)

router.post(
  '/:_id',
  asyncError(async (req, res, next) => {
    const newID = await wolf.deleteAndReplace(
      req,
      res,
      next
    )

    res.redirect(`/farms/${newID}`)
  })
)

router.get(
  '/:_id/delete',
  asyncError(async (req, res, next) => {
    const oldFarm = await wolf.Farm.findByIdAndDelete(
      req.params._id
    )

    await wolf.Product.deleteMany({
      _id: { $in: oldFarm.products },
    })

    res.redirect(`/farms`)
  })
)

router.get(
  '/:_id/edit',
  asyncError(async (req, res, next) => {
    const farm = await wolf.Farm.findById(
      req.params._id
    )
    res.render('farms/edit', { farm })
  })
)


router.get(
    '/:_id',
    asyncError(async (req, res, next) => {
      const farm = await wolf.Farm.findById(
        req.params._id
      ).populate('products')
  
      res.render('farms/show', { farm })
    })
  )
  
  router.get(
    '/:_id/products/new',
    asyncError(async (req, res) => {
      const farm = await wolf.Farm.findById(
        req.params._id
      )
      res.render('farms/newFarmProduct.ejs', { farm })
    })
  )
  
  router.post(
    '/:_id/products',
    asyncError(async (req, res, next) => {
      const farm = await wolf.Farm.findById(
        req.params._id
      )
      const newProduct = new Product({ ...req.body })
      farm.products.push(newProduct)
      newProduct.farm = farm
      await newProduct.save()
      await farm.save()
      res.redirect(`/farms/${farm._id}`)
    })
  )

module.exports = router
