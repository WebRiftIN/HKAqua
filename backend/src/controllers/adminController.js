import jwt from 'jsonwebtoken'
import { Order } from '../models/orderModel.js'
import { Contact } from '../models/contactModel.js'
import { Service } from '../models/serviceModel.js'

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Email or password is incorrect" })
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET_TOKEN)
        const options = {
            httpOnly: true,
            secure: false
        }
        return res.cookie("accessToken", token, options).json({ success: true, message: "LogedIn successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

const adminLogout = (req, res) => {
    res.clearCookie('accessToken', { path: '/' });
    res.json({ success: true, message: 'Logged out' });
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

const deleteService = async (req, res) => {
    const { servicesId } = req.params
    try {
        const deleted = await Service.findByIdAndDelete(servicesId);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        return res.json({ success: true, message: 'Service deleted' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 })
        return res.json({ success: true, contacts })
    } catch (error) {
        return res.json({ success: false, message: "Something went wrong" })
    }
}

const deleteOrder = async (req, res) => {
    const { orderId } = req.params
    try {
        const order = await Order.findByIdAndDelete(orderId)
        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }
        return res.json({ success: true, message: "Order deleted successfully" })
    } catch (error) {
        return res.json({ success: false, message: "Something went wrong" })
    }
}

const deleteContact = async (req, res) => {
    const { contactId } = req.params
    try {
        const contact = await Contact.findByIdAndDelete(contactId)
        if (!contact) {
            return res.json({ success: false, message: "message not found" })
        }
        return res.json({ success: true, message: "message deleted successfully" })
    } catch (error) {
        return res.json({ success: false, message: "Something went wrong" })
    }
}

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({}).sort({ createdAt: -1 })
        return res.json({ success: true, services })
    } catch (error) {
        return res.json({ success: false, message: "Something went wrong" })
    }
}

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        // Only update allowed fields for security
        const allowedFields = [
            'status',
            'installationDate',
            'installationTime',
            'notes',
            'technician',
            'priority',
            'serviceType',
            'customerName',
            'phone',
            'email',
            'street',
            'city',
            'pincode',
            'bookingDate',
            'address',
            'pinCode',
        ];
        const filteredUpdate = {};
        for (const key of allowedFields) {
            if (update[key] !== undefined) filteredUpdate[key] = update[key];
        }
        const service = await Service.findByIdAndUpdate(id, filteredUpdate, { new: true });
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
        res.json({ success: true, service });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Update failed', error: error.message });
    }
}

const adminDashboard = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments()
        const totalServices = await Service.countDocuments()
        const totalContacts = await Contact.countDocuments()

        const totalRevenueAgg = await Order.aggregate([
            {
                $match: { status: { $ne: "cancelled" } }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const totalRevenue = totalRevenueAgg[0]?.total || 0

        return res.status(200).json({ success: true, dashboard: { totalOrders, totalServices, totalContacts, totalRevenue } })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export { adminLogin, adminLogout, getAllOrders, getAllContacts, deleteOrder, deleteContact, adminDashboard ,getAllServices, deleteService, updateService }

