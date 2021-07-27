const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        nama_product : String,
        gender_product : String,
        jenis_product : String,
        gambar_product : String
    }
)

const product = mongoose.model('product', productSchema)

module.exports = product