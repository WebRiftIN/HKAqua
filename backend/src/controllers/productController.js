import { Product } from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"

const addProduct = async(req,res) =>{
    const{name,category,price,orignalPrice,features,isNew} = req.body;
    if([name,category,price,orignalPrice,features,isNew].some(field => !field)){
        return res.json({success:false,message:"All fields are required"})
    }
    let image = ''
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path,{folder:'products'})
        image = result.secure_url 
        fs.unlinkSync(req.file.path)
    }

    const product = await Product.create({
        name,
        category,
        price,
        orignalPrice,
        features,
        isNew,
        image
    })
    const productCreated = await Product.findById(product._id).select("-name -category")
    if(!productCreated){
        return res.json({success:false,message:"Try Again"})
    }
    return res.json({success:true,message:"Product added successfuly"})
}

export default addProduct