import { Product } from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs";

const addProduct = async(req,res) =>{
    const{name,category,categoryText,description,discountedPrice,originalPrice,specifications,isNewProduct,isLimited,isOutOfStock,isInactive} = req.body;
    if([name,category,description,discountedPrice,originalPrice,specifications].some(field => field === undefined || field === null || field === "")){
        return res.json({success:false,message:"All fields are required"})
    }
    let image = ''
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path,{folder:'products'})
        image = result.secure_url 
        fs.unlinkSync(req.file.path)
    }
    let parsedSpecifications = []
    if (Array.isArray(specifications)) {
        parsedSpecifications = specifications
    } else if (typeof specifications === 'string') {
        try {
            parsedSpecifications = JSON.parse(specifications)
        } catch (e) {
            // Fallback: allow comma-separated values like "a,b,c"
            parsedSpecifications = specifications
                .split(',')
                .map(s => s.trim())
                .filter(Boolean)
        }
    }

    const discountedPriceNum = Number(discountedPrice)
    const originalPriceNum = Number(originalPrice)
    const isNewProductBool = String(isNewProduct) === 'true'
    const isLimitedBool = String(isLimited) === 'true'
    const isOutOfStockBool = String(isOutOfStock) === 'true'
    const isInactiveBool = String(isInactive) === 'true'

    const product = await Product.create({
        name,
        category,
        categoryText: categoryText || category,
        description,
        discountedPrice: discountedPriceNum,
        originalPrice: originalPriceNum,
        specifications:parsedSpecifications,
        isNewProduct: isNewProductBool,
        isLimited: isLimitedBool,
        isOutOfStock: isOutOfStockBool,
        isInactive: isInactiveBool,
        image
    })
    const productCreated = await Product.findById(product._id).select("-name -category")
    if(!productCreated){
        return res.json({success:false,message:"Try Again"})
    }
    return res.json({success:true,message:"Product added successfuly"})
}

const getAllProducts = async(req,res) =>{
    try {
        const products = await Product.find({})
        res.json({success:true,products})
    } catch (error) {
        res.json({success:false,message:"Something went wrong"})
    }
}

const getProductById = async(req,res) =>{
    try{
        const{productId} = req.params;
        const product = await Product.findById(productId)
        if(!product){
            return res.json({success:false,message:"product not found"})
        }

        res.json({success:true,product})
    }catch{
        res.json({success:false,message:"something went wrong"})
    }
}

const updateProduct = async(req,res) =>{
    try{
        const {productId} = req.params;
        const {name,category,categoryText,description,discountedPrice,originalPrice,specifications,isNewProduct,isLimited,isOutOfStock,isInactive} = req.body;
        
        const product = await Product.findById(productId)
        if(!product){
            return res.json({success:false,message:"Product not found"})
        }

        let image = product.image // Keep existing image by default
        if(req.file){
            // Delete old image from cloudinary if exists
            if(product.image){
                const publicId = product.image.split('/').slice(-2).join('/').split('.')[0]
                await cloudinary.uploader.destroy(publicId)
            }
            const result = await cloudinary.uploader.upload(req.file.path,{folder:'products'})
            image = result.secure_url 
            fs.unlinkSync(req.file.path)
        }

        let parsedSpecifications = product.specifications
        if (specifications !== undefined) {
            if (Array.isArray(specifications)) {
                parsedSpecifications = specifications
            } else if (typeof specifications === 'string') {
                try {
                    parsedSpecifications = JSON.parse(specifications)
                } catch (e) {
                    parsedSpecifications = specifications
                        .split(',')
                        .map(s => s.trim())
                        .filter(Boolean)
                }
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name: name || product.name,
                category: category || product.category,
                categoryText: categoryText || product.categoryText,
                description: description || product.description,
                discountedPrice: discountedPrice ? Number(discountedPrice) : product.discountedPrice,
                originalPrice: originalPrice ? Number(originalPrice) : product.originalPrice,
                specifications: parsedSpecifications,
                isNewProduct: isNewProduct !== undefined ? String(isNewProduct) === 'true' : product.isNewProduct,
                isLimited: isLimited !== undefined ? String(isLimited) === 'true' : product.isLimited,
                isOutOfStock: isOutOfStock !== undefined ? String(isOutOfStock) === 'true' : product.isOutOfStock,
                isInactive: isInactive !== undefined ? String(isInactive) === 'true' : product.isInactive,
                image
            },
            {new: true}
        )

        res.json({success:true,message:"Product updated successfully",product:updatedProduct})
    }catch(error){
        console.error('Update product error:', error)
        res.json({success:false,message:"Error updating product"})
    }
}

const deleteProduct = async(req,res) =>{
    try{
        const {productId} = req.params;
        const product = await Product.findById(productId)
        if(!product){
            return res.json({success:false,message:"Product not found"})
        }

        // Delete image from cloudinary if exists
        if(product.image){
            try {
                const publicId = product.image.split('/').slice(-2).join('/').split('.')[0]
                await cloudinary.uploader.destroy(publicId)
            } catch (error) {
                console.error('Error deleting image from cloudinary:', error)
            }
        }

        await Product.findByIdAndDelete(productId)
        res.json({success:true,message:"Product deleted successfully"})
    }catch(error){
        console.error('Delete product error:', error)
        res.json({success:false,message:"Error deleting product"})
    }
}

export {addProduct,getAllProducts,getProductById,updateProduct,deleteProduct}