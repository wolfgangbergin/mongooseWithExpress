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
      res.redirect(`/business`)
    })
  )
  


module.exports = router