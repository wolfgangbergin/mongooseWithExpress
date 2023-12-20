const Product = require('./models/product')

module.exports = async () => {
  let temp = await Product.find({
    $or: [{ name: /kimbo/ }, { name: /\W\s\swolf\s\?\?/ }],
  })

  l(`//>>>>>>>>>>>>>>>>>>>>>
  >>>>>>>>>>>>>>>>>>>>>//`)



  


  temp.forEach((ele) => {
    l(ele.name)
  })
}
