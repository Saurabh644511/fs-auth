import UserModel from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {

    const user = await UserModel.findById(req.userId).select("name email");

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({name: user.name, email: user.email});

  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
