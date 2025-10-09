import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const connnetionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`);
        console.log(`MongoDB connected: ${connnetionInstance.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;