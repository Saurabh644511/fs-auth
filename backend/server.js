import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectdb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

connectdb();

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
