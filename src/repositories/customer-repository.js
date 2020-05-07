/**
 * Importando
 * *bibliotecas
 * *Model
 */
const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')


exports.create = async (data) => {
    let customer = new Customer(data)
    await customer.save()
}

exports.get = async () =>{
    return await Customer.find()
}

//metodo para autenticacao
exports.authenticate = async (data) =>{
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    })
    return res
}

exports.getById = async (id) =>{
    const res = await Customer.findById(id)
    return res
}