import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js"

// const addToCart = async(req,res) =>{
//     try {
//         const {userId,itemId} = req.body;
//         // console.log(userId);
        
//         const userData = await User.findById(userId)
//         let cartData = userData.cartData
    
//         if(cartData[itemId]){
//             cartData[itemId]+=1;
//         }else{
//             cartData[itemId] = 1;
//         }
    
//         await User.findByIdAndUpdate(userId,{cartData})
//         return res.json({success:true,message:"Added to cart"})
//     } catch (error) {
//         res.json({success:false,message:error.message})
//     }
// }

const addToCart = async(req,res) =>{
    try {
        const {userId,itemId} = req.body;
        // console.log(userId);
        
        const userData = await User.findById(userId)
        let cartData = userData.cartData
        const productData = await Product.findById(itemId)
        if(!productData){
            return res.json({success:false,message:"product not found"})
        }
    
        if(cartData[itemId]){
            cartData[itemId].quantity+=1;
        }else{
            cartData[itemId] = {
                quantity: 1,
                name: productData.name,
            };
        }
    
        await User.findByIdAndUpdate(userId,{cartData})
        return res.json({success:true,message:"Added to cart"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const getUserCart = async (req,res) => {

    try {
        
        const { userId } = req.body
        
        const userData = await User.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const updateQuantity = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;
        
        const userData = await User.findById(userId)
        let cartData = userData.cartData

        if (quantity <= 0) {
            delete cartData[itemId]
        } else {
            cartData[itemId] = quantity
        }

        await User.findByIdAndUpdate(userId, { cartData })
        return res.json({ success: true, message: "Quantity updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const removeItem = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        
        const userData = await User.findById(userId)
        let cartData = userData.cartData

        delete cartData[itemId]

        await User.findByIdAndUpdate(userId, { cartData })
        return res.json({ success: true, message: "Item removed from cart" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;
        
        await User.findByIdAndUpdate(userId, { cartData: {} })
        return res.json({ success: true, message: "Cart cleared" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export {addToCart, getUserCart, updateQuantity, removeItem, clearCart}