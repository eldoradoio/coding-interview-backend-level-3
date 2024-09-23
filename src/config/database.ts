import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI_A = process.env.MONGO_URI_A || "mongodb://localhost:27017/items_a";
const MONGO_URI_B = process.env.MONGO_URI_B || "mongodb://localhost:27018/items_b";

export const connectToDatabase = async () => {
  try {
    const dbA = await mongoose.createConnection(MONGO_URI_A);
    const dbB = await mongoose.createConnection(MONGO_URI_B);

    console.log("Connected to both databases");
    return { dbA, dbB };
  } catch (error) {
    console.error("Error connecting to databases:", error);
    process.exit(1);
  }
};
