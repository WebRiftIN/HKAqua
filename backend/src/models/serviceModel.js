import mongoose,{Schema} from "mongoose";


const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    // New fields for admin panel
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
        default: 'scheduled',
        required: true
    },
    installationDate: {
        type: String // Store as string (YYYY-MM-DD)
    },
    installationTime: {
        type: String // Store as string (HH:mm or similar)
    },
    notes: {
        type: String
    },
    technician: {
        type: String
    },
    priority: {
        type: String,
        enum: ['normal', 'high', 'urgent'],
        default: 'normal'
    },
    bookingDate: {
        type: String // Store as string (YYYY-MM-DD)
    }
}, { timestamps: true });

export const Service = mongoose.model("Service",serviceSchema)