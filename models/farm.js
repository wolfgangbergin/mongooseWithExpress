const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
