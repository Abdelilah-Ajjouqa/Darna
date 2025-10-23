import express from "express";
import 'dotenv/config'
import priceEstimationRoutes from "./routes/priceEstimationRoutes";
const dbConnect = require(__dirname + "/config/db_config");


dbConnect();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", priceEstimationRoutes);

app.listen(port, () => {
  console.log(`running Server on http://localhost:${port}`);
});





