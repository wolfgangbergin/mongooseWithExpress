globalThis.l = console.log
globalThis.d = console.dir

globalThis.wolf = {}
globalThis.wolf.Farm = require('./models/farm')
globalThis.wolf.Product = require('./models/product')

globalThis.wolf.categories = ['fruit', 'vegetable', 'dairy', 'meat']

globalThis.wolf.deleteFarmFunc = async (req, res, save) => {
    l('///////////////////////////////////////////////')
    const oldFarm = await wolf.Farm.findById(req.params._id)
    const newFarm = new wolf.Farm(req.body)
     if (save) {
    

    var test1 = await oldFarm.products.map( async(product) => {
      const kimbo =  await wolf.Product.findById(product).populate()

      const newProduct = new wolf.Product({
        name: kimbo?.name ?? 'wolfMan',
        price: kimbo?.price ?? 'wolfMan',
        category: kimbo?.category ?? 'wolfMan',
      })
       newFarm.products.push(newProduct._id)
      l('1' )
       newProduct.save()
     return 'banana'
    })
   l('2')
  }
  l(test1)
  var test2 = await test1
  l(test2)
  l('3' )
  await newFarm.save()
  await wolf.Farm.findByIdAndDelete(req.params._id)
   await wolf.Product.deleteMany({ _id: { $in: oldFarm.products } })
  res.redirect(`/farms`)
}

globalThis.wolf.testFunc = async ( req, res) => {
  let count = 0
  l('//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//')
  const oldFarm = await wolf.Farm.findById(req.params._id)
  const newFarm = new wolf.Farm(req.body)
  oldFarm.products.forEach(async (product) => {
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
    count++
    if (count === oldFarm.products.length) {
      await newFarm.save()
      await wolf.Farm.findByIdAndDelete(req.params._id)
      await wolf.Product.deleteMany({
        _id: { $in: oldFarm.products },
      })
      res.redirect(`/farms`)
      l('2')
    }
  })

 return 'finshed'
}

exports
