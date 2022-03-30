const { productModel }  = require('../models/index')
const { cartModel } = require('../models/index')

module.exports = {
    addProduct: async (req, res) => {
        try {
            const { id, productId } = req.params
            const { products } = await cartModel.getById(id)
            const product = await productModel.getById(productId)
            products.push(product)
            await cartModel.update(id, { products })
            res.sendStatus(201)
          }catch(e){
            console.log(e)
            res.status(500).send({
                error: e.message
            })
        }
    },
    getById: async (req, res) => {
        try{
            const { id } = req.params
            const cart = await cartModel.getById(id)
            res.send(cart)
         }catch(e){
             console.log(e)
             res.status(500).send({
                 error: e.message
             })
         }
    },
    post: async (req, res) => {
        try{
            const id = await cartModel.save({ products: [] })
            res.send(id)
        }catch(e){
            console.log(e)
            res.status(500).send({
                error: e.message
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await cartModel.delete(id)
            res.sendStatus(200)
          }
          catch (e) {
            console.log(e)
            res({ error: e.message })
          }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id, productId } = req.params
            const { products } = await cartModel.getById(id)
            const index = products.findIndex(i => i.id == productId)
            
            if (index == -1) throw new Error('Product not found')

            products.splice(index, 1)

            await cartModel.update(id, { products })
            res.sendStatus(200)
          }
          catch (e) {
            console.log(e)
            res({ error: e.message })
          }
    },
}


