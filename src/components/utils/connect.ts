import mongoose from "mongoose";

const connect = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_DB environment variable is not defined");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

export default connect;
