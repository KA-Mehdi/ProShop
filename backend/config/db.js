import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://mehdi:mehdi@cluster0.v6hwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Database Connection Error: ${err.message}`);
        process.exit(1);
    }
};


export default connectDB