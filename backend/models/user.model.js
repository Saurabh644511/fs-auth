import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);


const UserModel = mongoose.model("users", userSchema);

export default UserModel;
