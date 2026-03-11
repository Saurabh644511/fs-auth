import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendVerificationEmail} from "../utils/email.utils.js";

export const registerController = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let isExisted = await UserModel.findOne({ email });

    if (isExisted) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
      isVerified: false,
    });

    let token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    sendVerificationEmail(email, token).catch((err) => {
      console.error("Failed in sending Email->", err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Verify the email by clicking on the sent link",
    });
  } catch (error) {
    console.log("Error in reg", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    let { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({
        message: "Invalid token...",
      });
    }

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: "Email already verified." });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("Error in email verification", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let existedUser = await UserModel.findOne({ email });

    if (!existedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let checkPass = await bcrypt.compare(password, existedUser.password);

    if (!checkPass) {
      return res.status(401).json({
        message: "Incorrect Email or Password",
      });
    }

    if (!existedUser.isVerified) {
      return res.status(403).json({ message: "Please verify your email before login." });
    }


    let token = jwt.sign(
      { id: existedUser._id, email: existedUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    return res.status(200).json({
      success: true,
      message: "User Logged in",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
