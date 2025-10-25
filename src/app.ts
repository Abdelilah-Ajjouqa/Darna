require("dotenv").config({ path: __dirname + "/../.env" });

import express from "express";
import { connectionDB } from "./config/db_config";
import RealEstateRoutes from "./routes/realEstate.routes"

connectionDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/realEstate', RealEstateRoutes)

app.listen(port, () => {
  console.log(`running Server on http://localhost:${port}`);
});
