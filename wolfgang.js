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
    
    

    oldFarm.products.forEach( async(product) => {
      const kimbo =  await wolfgang.Product.findById(product).populate()

      const newProduct = new wolfgang.Product({
        name: kimbo?.name ?? 'wolfMan',
        price: kimbo?.price ?? 'wolfMan',
        category: kimbo?.category ?? 'wolfMan',
      })
       newFarm.products.push(newProduct._id)
      l('1' )
       newProduct.save()
     
    })
   l('2')
  }
  l('3' )
  await newFarm.save()
  await wolfgang.Farm.findByIdAndDelete(req.params._id)
   await wolfgang.Product.deleteMany({ _id: { $in: oldFarm.products } })
  res.redirect(`/farms`)
}



exports
