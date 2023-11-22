const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
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
    required: [true, 'Email is required'],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})

const Farm = mongoose.model('Product', productSchema)

module.exports = Farm
