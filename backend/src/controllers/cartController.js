import { User } from "../models/userModel.js";
import { Product } from "../models/productModel.js"


const addToCart = async(req,res) =>{
    try {
        const {userId,itemId} = req.body;
        
        const userData = await User.findById(userId)
        let cartData = userData.cartData
        
        // Check if it's an addon item (warranty or maintenance)
        let itemName = '';
        let isAddon = false;
        
        if (itemId.startsWith('warranty:') || itemId.startsWith('maintenance:')) {
            isAddon = true;
            const [type, productId] = itemId.split(':');
            const productData = await Product.findById(productId);
            if (!productData) {
                return res.json({success:false,message:"Product not found for addon"});
            }
            itemName = type === 'warranty' 
                ? `Extended Warranty for ${productData.name}` 
                : `Annual Maintenance for ${productData.name}`;
        } else {
            // Regular product
            const productData = await Product.findById(itemId);
            if (!productData) {
                return res.json({success:false,message:"Product not found"});
            }
            itemName = productData.name;
        }
    
        if(cartData[itemId]){
            if (typeof cartData[itemId] === 'object') {
                cartData[itemId].quantity += 1;
            } else {
                // Convert old format to new format
                cartData[itemId] = {
                    quantity: cartData[itemId] + 1,
                    name: itemName
                };
            }
        } else {
            cartData[itemId] = {
                quantity: 1,
                name: itemName,
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
            // Check if cart item is an object (new structure) or number (old structure)
            if (typeof cartData[itemId] === 'object' && cartData[itemId] !== null) {
                // New structure: {quantity: X, name: "..."}
                cartData[itemId].quantity = quantity
            } else {
                // Old structure or simple number
                cartData[itemId] = quantity
            }
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