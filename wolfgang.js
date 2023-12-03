globalThis.l = console.log
globalThis.d = console.dir

globalThis.wolfgang = {}
globalThis.wolfgang.Farm = require('./models/farm')
globalThis.wolfgang.Product = require('./models/product')

globalThis.wolfgang.categories = ['fruit', 'vegetable', 'dairy', 'meat']

globalThis.wolfgang.deleteFarmFunc = async (req, res, save) => {
  const oldFarm = await wolfgang.Farm.findById(req.params._id)
  const newFarm = new wolfgang.Farm(req.body)

  oldFarm.products.forEach(async (product) => {
    const { name, price, category } = await wolfgang.Product.findById(
      product
    ).populate()

    const newProduct = new wolfgang.Product({
      name,
      price,
      category,
    })
    newFarm.products.push(newProduct)
    await newProduct.save()
  })
  await wolfgang.Farm.findByIdAndDelete(req.params._id)
  await wolfgang.Product.deleteMany({ _id: { $in: oldFarm.products } })
   await newFarm.save()
  res.redirect(`/farms`)
}

exports
