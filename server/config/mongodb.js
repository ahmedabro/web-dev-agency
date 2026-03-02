import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI)
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "webAgencyDB",
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;