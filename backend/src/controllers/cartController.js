import { User } from "../models/userModel.js";

const addToCart = async(req,res) =>{
    try {
        const {userId,itemId} = req.body;
        console.log(userId);
        
        const userData = await User.findById(userId)
        let cartData = userData.cartData
    
        if(cartData[itemId]){
            cartData[itemId]+=1;
        }else{
            cartData[itemId] = 1;
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

export {addToCart,getUserCart}