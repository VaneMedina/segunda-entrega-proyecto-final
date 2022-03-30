const {productModel} = require('../models/index')

module.exports = {
    get: async (req, res) => {
        try{
        const { search } = req.query
           const products = await productModel.getAll(search)
           res.send(products)
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
            const product = await productModel.getById(id)
            if(!product){
                res.status(404).send({ error: "No se encontró el producto"})
                return
            }
            res.status(200).send(product)
         }catch(e){
             console.log(e)
             res.status(500).send({
                 error: e.message
             })
         }
    },
    post: async (req, res) => {
        try{
           const { body } = req
           const product = await productModel.create(body)
           res.status(201).send(product.id)
        }catch(e){
            console.log(e)
            res.status(500).send({
                error: e.message
            })
        }
    },
    put: async (req, res) => {
        try {
            const { id } = req.params
            const { body } = req
            await productModel.update(id, body)
            res.sendStatus(201)
          }catch (e) {
            console.log(e)
            res.send({ error: e.message })
          }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await productModel.delete(id)
            res.sendStatus(200)
          }
          catch (e) {
            console.log(e)
            res({ error: e.message })
          }
    },
}


