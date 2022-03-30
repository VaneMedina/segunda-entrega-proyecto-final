const mongoose = require('mongoose')
const { SCHEMA, USER, PASSWORD, HOSTNAME, DATABASE, OPTIONS } = require("../../config")

const URI = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`
mongoose.connect(URI);

class Cart{
  constructor(){
    const schema = {
      products: [{
        name: String,
        description: String,
        code: String,
        thumbnail: String,
        price: Number,
        stock: Number,
        timestamp: {type: Number, default: Date.now()}
      }]}
    this.model = mongoose.model("carts", new mongoose.Schema(schema))
  }
    async save(data) {
      const { _id } = await this.model.create(data)
      console.log(_id)
      return _id
    }
    async update(id, product) {
        const item = await this.model.findByIdAndUpdate(id, product)
        if (!item) throw new Error('Item not found')
    }
    async getById(_id) {
      const product = await this.model.findById(_id)
      return product
    }
    async delete(id) {
      const item = await this.model.findByIdAndDelete(id)
      if (!item) throw new Error('Item not found')
    }
}

module.exports = Cart