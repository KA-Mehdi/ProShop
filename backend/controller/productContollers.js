import asyncHandler from "express-async-handler";
import Product from '../modals/productModal.js'

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
        res.json(products);
})

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new  Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
})

export  {getProducts, getProductById, createProduct};