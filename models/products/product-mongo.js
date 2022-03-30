const mongoose = require('mongoose')
const { SCHEMA, USER, PASSWORD, HOSTNAME, DATABASE, OPTIONS } = require("../../config")

const URI = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`
mongoose.connect(URI);


class Product {
    constructor(){
        const schema = {
            name: String,
            timestamp: { type: Number, default: Date.now()},
            description: String,
            code: String,
            thumbnail: { type: String, default: "Una imagen"},
            price: Number,
            stock: { type: Number, default: 0}
        }
        this.model = mongoose.model("products", new mongoose.Schema(schema))
    }
    async getAll(search = '') {
        let find = search ? { name: { $regex: search, $options: "i" } } : {}
        const products = await this.model.find(find)
        return products
    }
    async getById(_id) {
        const product = await this.model.findById(_id)
        return product
    }
    async create(obj) {
        const product = await this.model.create(obj)
        return product
    }
    async update(id, product) {
        const item = await this.model.findByIdAndUpdate(id, product)
        if (!item) throw new Error('Item not found')
    }
    async delete() {
        const item = await this.model.findByIdAndDelete(id)
        if (!item) throw new Error('Item not found')
    }
}



module.exports = Product