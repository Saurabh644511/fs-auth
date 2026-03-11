import mongoose from "mongoose";

const connectdb = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/task");
    if (res) {
      console.log("mongodb connected");
    }
  } catch (error) {
    console.log("Error while connecting db", error);
  }
};

export default connectdb;
