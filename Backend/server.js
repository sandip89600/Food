import express from "express";
import cors from "cors";
import "dotenv/config";                // .env load karega
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// app config
const app = express();

// 🔴 Render / Railway jaisi services apna PORT env me deti hain
const PORT = process.env.PORT || 4000;

// ---------------- MIDDLEWARE ----------------

app.use(express.json());

// ✅ CORS proper config
const allowedOrigins = [
  "http://localhost:5173",             // Vite local
  "http://localhost:3000",             // agar kabhi use karo
  "https://your-frontend.vercel.app",  // 👉 yahan apna real Vercel URL daalna
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman / server-to-server ke liye
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ---------------- DB CONNECTION ----------------

connectDB();

// ---------------- API ENDPOINTS ----------------

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// ---------------- START SERVER ----------------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // optional, agar kahin import karna ho
