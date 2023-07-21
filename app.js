const express = require('express')
const app = express()
const Product = require('./models/product')
const mongoose = require('mongoose')

main().catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/productDb')
}

app.use(express.urlencoded({extended: true}))

app.get('/products', async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

app.post('/products', async(req, res) => {
    const {name, price, company, description, isFeatured, rating} = req.body
    const newProduct = new Product({name, price, company, description, isFeatured, rating})
    console.log(newProduct)
    await newProduct.save()
    res.status(200).json({
        message: 'Product added successfully!',
        Product: newProduct
    })
})

app.get('/products/featured', async(req, res) => {
    const featuredProducts = await Product.find({isFeatured: true})
    res.status(200).json(featuredProducts)
})

app.get('/products/:id', async(req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
})

app.listen(8080, () => {
    console.log("Listening on port 8080!")
})

