const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      
    },
    price: {
        type:   String,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        lowercase: true,
        enum: wolfgang.categories
    },
    })

const Product = mongoose.model('Product', productSchema)

module.exports = Product