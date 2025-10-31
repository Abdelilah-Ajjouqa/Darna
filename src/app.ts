import express from "express";
import 'dotenv/config';
import priceEstimationRoutes from "./routes/priceEstimationRoutes";
import { connectionDB } from "./config/db_config";
import RealEstateRoutes from "./routes/realEstate.routes"



connectionDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", priceEstimationRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





