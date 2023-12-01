const mongoose = require('mongoose')
const Product = require('./product')

const { Schema } = mongoose

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  email: {
    type: String,
   
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})



// farmSchema.post('findOneAndDelete', async function (data) {
//   if (data.products.length) {
//     const res = await Product.deleteMany({ _id: { $in: data.products } })
//     console.log(res)
//   }
// })


const Farm = mongoose.model('Farm', farmSchema)

module.exports = Farm
