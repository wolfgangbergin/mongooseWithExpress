globalThis.l = console.log
globalThis.d = console.dir

globalThis.wolfgang = {}
globalThis.wolfgang.Farm = require('./models/farm')
globalThis.wolfgang.Product = require('./models/product')

globalThis.wolfgang.categories = ['fruit', 'vegetable', 'dairy', 'meat']

globalThis.wolfgang.deleteFarmFunc = async (req, res, save) => {
    l('///////////////////////////////////////////////')
    const oldFarm = await wolfgang.Farm.findById(req.params._id)
    const newFarm = new wolfgang.Farm(req.body)
     if (save) {
    

    var test1 = await oldFarm.products.map( async(product) => {
      const kimbo =  await wolfgang.Product.findById(product).populate()

      const newProduct = new wolfgang.Product({
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
  await wolfgang.Farm.findByIdAndDelete(req.params._id)
   await wolfgang.Product.deleteMany({ _id: { $in: oldFarm.products } })
  res.redirect(`/farms`)
}

globalThis.wolfgang.testFunc = async (oldFarm, newFarm, req, res) => {
  let count = 0
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
    l('1')
    count++
    if (count === oldFarm.products.length) {
      await newFarm.save()
      await wolfgang.Farm.findByIdAndDelete(req.params._id)
      await wolfgang.Product.deleteMany({
        _id: { $in: oldFarm.products },
      })
      res.redirect(`/farms`)
      l('2')
    }
  })

 return 'finshed'
}

exports
