import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const connnetionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`);
      
    } catch (error) {
      
        process.exit(1);
    }
}

export default connectDB;