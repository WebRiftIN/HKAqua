import { Service } from "../models/serviceModel.js";

const bookService = async (req, res) => {
    try {
        const { name, phoneNumber, email, address, city, pinCode, serviceType } = req.body;
        if (!name || !email || !address || !city || !serviceType) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!phoneNumber || !pinCode) {
            return res.status(400).json({
                success: false,
                message: "Phone number and pin code are required"
            });
        }

        // Normalize phone number to a string (remove non-digits)
        const normalizedPhone = String(phoneNumber).replace(/\D/g, "");

        // Prevent duplicate entries at the application level
        const existing = await Service.findOne({ phoneNumber: normalizedPhone });
        if (existing) {
            return res.status(409).json({ success: false, message: "A service with this phone number already exists" });
        }

        const service = await Service.create({
            name,
            phoneNumber: normalizedPhone,
            email,
            address,
            city,
            pinCode,
            serviceType
        });

        const serviceCreated = await Service.findById(service._id);
        if (!serviceCreated) {
            return res.status(500).json({ success: false, message: "Something went wrong" });
        }
        return res.json({ success: true, message: "Service created successfully" });
    } catch (error) {
        // Handle duplicate-key errors from MongoDB in case index exists
        if (error && error.code === 11000) {
            return res.status(409).json({ success: false, message: "Duplicate entry detected" });
        }
        return res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}

export { bookService }