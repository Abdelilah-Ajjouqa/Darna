import express from "express";
import 'dotenv/config';
import priceEstimationRoutes from "./routes/priceEstimationRoutes";
import { connectionDB } from "./config/db_config";

// Initialize database connection
connectionDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", priceEstimationRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





