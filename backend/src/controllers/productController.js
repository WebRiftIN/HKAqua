import { Product } from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs";

const addProduct = async(req,res) =>{
    const{name,category,description,discountedPrice,originalPrice,specifications,isNewProduct,isLimited,isOutOfStock,isInactive} = req.body;
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

export {addProduct,getAllProducts,getProductById}