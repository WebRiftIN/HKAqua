import { User } from "../models/userModel.js";

const addToCart = async(req,res) =>{
    try {
        const {userId,itemId, options} = req.body;
        
        const userData = await User.findById(userId)
        let cartData = userData.cartData || {}

        // existing entry may be number or object
        const existing = cartData[itemId]
        if (existing) {
            if (typeof existing === 'number') {
                // upgrade to object preserving qty
                cartData[itemId] = { qty: existing + 1, addons: options?.addons || {} }
            } else if (typeof existing === 'object') {
                cartData[itemId].qty = (cartData[itemId].qty || 0) + 1
                // merge addons if provided
                if (options?.addons) {
                    cartData[itemId].addons = { ...(cartData[itemId].addons || {}), ...(options.addons || {}) }
                }
            }
        } else {
            // new entry: store object if addons provided, else number for backward compatibility
            if (options?.addons) {
                cartData[itemId] = { qty: 1, addons: options.addons }
            } else {
                cartData[itemId] = 1
            }
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
            const existing = cartData[itemId]
            if (existing && typeof existing === 'object') {
                cartData[itemId].qty = quantity
            } else {
                // if it was a number or missing, set to number
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
        let cartData = userData.cartData || {}

        // support synthetic addon ids like 'productId::addon_warranty'
        if (String(itemId).includes('::')) {
            const [baseId, addonKey] = String(itemId).split('::')
            const existing = cartData[baseId]
            if (existing && typeof existing === 'object') {
                // remove addon flag
                const addonName = addonKey.replace('addon_', '')
                if (existing.addons) {
                    // map known addon keys to stored names
                    // our frontend stores addons as { warranty: true } or { maintenance5: true }
                    if (addonKey.includes('warranty')) {
                        delete existing.addons.warranty
                    } else if (addonKey.includes('5_maintenance') || addonKey.includes('maintenance5')) {
                        delete existing.addons.maintenance5
                    }
                    // if no addons left and qty is a number, we could convert back, but keep object
                }
                cartData[baseId] = existing
                await User.findByIdAndUpdate(userId, { cartData })
                return res.json({ success: true, message: 'Addon removed' })
            }
        }

        // default: delete the key
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