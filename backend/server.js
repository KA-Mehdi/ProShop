import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import products from './data/products.js';
import productRoutes from './routes/productsRoutes.js'


dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Add this if handling JSON data in POST requests

// Routes
app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRoutes)


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
