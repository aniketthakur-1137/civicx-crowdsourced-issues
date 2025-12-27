import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";



import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: "https://civicx-crowdsourced.onrender.com",
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);





app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
