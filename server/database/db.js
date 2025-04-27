import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");
      } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default connectDB; 