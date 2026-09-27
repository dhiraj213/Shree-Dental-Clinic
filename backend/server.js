import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import appointmentRoutes from './routes/appointmentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env.example') });

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database connection (non-blocking)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/om_dental_clinic';

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB notice: Running in non-blocking mode (' + err.message + ')'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Routes
app.use('/api/appointments', appointmentRoutes);

// Export Express app for Vercel
export default app;
