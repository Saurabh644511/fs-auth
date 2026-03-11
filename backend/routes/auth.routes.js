import express from "express";
import { loginController, registerController, verifyEmail } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController );

router.get("/verify/:token", verifyEmail);

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user, email: req.email });
});


export default router;
