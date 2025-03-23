import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import bodyParser from "body-parser";
import cookieParser  from "cookie-parser";



// Connect to the database
connectDB();

const app = express();

//middlware: body parser
app.use(express.json()); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//cookieparser middleware
app.use(cookieParser())

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});
// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow cookies to be sent with the request
};

app.use(cors(corsOptions));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use(notFound);
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
