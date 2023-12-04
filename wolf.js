globalThis.l = console.log
globalThis.d = console.dir

globalThis.wolf = {}
globalThis.wolf.Farm = require('./models/farm')
globalThis.wolf.Product = require('./models/product')

globalThis.wolf.categories = ['fruit', 'vegetable', 'dairy', 'meat']

globalThis.wolf.doSomethingAsync = async (product, newFarm) => {
  return new Promise(async (resolve) => {
    const { name, price, category } = await wolf.Product.findById(
      product
    ).populate()

    const newProduct = new wolf.Product({
      name: name ?? 'wolfMan',
      price,
      category,
    })
    newFarm.products.push(newProduct)
    await newProduct.save()
    l('1')

    resolve()
  })
}

globalThis.wolf.testFunc = async (req, res, save) => {
  const oldFarm = await wolf.Farm.findById(req.params._id)
  if (save) {
  
  const newFarm = new wolf.Farm(req.body)
  await Promise.all(
    oldFarm.products.map(async (product) => {
      await wolf.doSomethingAsync(product, newFarm)
    })
  )
  await newFarm.save()
}
  await wolf.Farm.findByIdAndDelete(req.params._id)
  await wolf.Product.deleteMany({
    _id: { $in: oldFarm.products },
  })
  res.redirect(`/products`)
  l('2')
}

exports
