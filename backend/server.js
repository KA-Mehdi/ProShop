import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import productRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import bodyParser from "body-parser";



// Connect to the database
connectDB();

const app = express();

//middlware: body parser
app.use(express.json()); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});
// Middleware
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
