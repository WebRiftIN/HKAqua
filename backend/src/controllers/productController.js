import { Product } from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"
import fs from "fs";

const addProduct = async(req,res) =>{
    const{name,category,description,discountedPrice,orignalPrice,specifications,isNewProduct,isLimited,isOutOfStock,isInactive} = req.body;
    if([name,category,description,discountedPrice,orignalPrice,specifications].some(field => field === undefined || field === null || field === "")){
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
    const orignalPriceNum = Number(orignalPrice)
    const isNewProductBool = String(isNewProduct) === 'true'
    const isLimitedBool = String(isLimited) === 'true'
    const isOutOfStockBool = String(isOutOfStock) === 'true'
    const isInactiveBool = String(isInactive) === 'true'

    const product = await Product.create({
        name,
        category,
        description,
        discountedPrice: discountedPriceNum,
        orignalPrice: orignalPriceNum,
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

export default addProduct