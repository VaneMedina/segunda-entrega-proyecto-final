const Product = require(`./products/product-${process.env.DB}.js`)
const Cart = require(`./cart/cart-${process.env.DB}.js`)

const productModel = new Product()
const cartModel = new Cart()

// export default{
//     Product,
//     Cart
// }
module.exports = {productModel, cartModel} 