
const Product = require('./models/product')




    module.exports = async () => {
        
      let temp = await Product.find({$or: [{name: /De/}, {name: /Ro/}]})
    
        console.log(temp);
        }


        