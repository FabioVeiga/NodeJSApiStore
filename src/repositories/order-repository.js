/**
 * Importando
 * *bibliotecas
 * *Model
 */
const mongoose = require('mongoose')
const Order = mongoose.model('Order')


exports.create = async (data) => {
    let order = new Order(data)
    await order.save()
}

exports.get = async () =>{
    return await Order
    .find({}, 'number status customer items')
    .populate('customer', 'name') //tras a informacao do customer 
    .populate('items.product', 'title')//tras a informacao do product
}