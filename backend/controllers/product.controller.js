import mongoose from 'mongoose'

import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    return res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    console.error(`Error in get products: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const createProduct = async (req, res) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    })
  }

  const newProduct = new Product(product)

  try {
    newProduct.save()
    return res.status(201).json({
      success: true,
      message: 'Product added successfully',
    })
  } catch (error) {
    console.error(`Error in create product: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const product = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product id',
    })
  }

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    })
  }

  try {
    await Product.findByIdAndUpdate(id, product, { new: true })
    return res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    console.error(`Error in update product: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product id',
    })
  }

  try {
    await Product.findByIdAndDelete(id)
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    console.error(`Error in delete product: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
