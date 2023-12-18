const express = require('express')
const router = express.Router()
const Farm = require('../models/farm')
const asyncError = require('../asyncError/asyncError')
require('../wolf')

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

module.exports = router
