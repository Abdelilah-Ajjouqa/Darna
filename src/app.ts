<<<<<<< HEAD
import express from "express";
import 'dotenv/config'
import priceEstimationRoutes from "./routes/priceEstimationRoutes";
const dbConnect = require(__dirname + "/config/db_config");


dbConnect();
=======
require("dotenv").config({ path: __dirname + "/../.env" });

import express from "express";
import { connectionDB } from "./config/db_config";

//connectionDB();
>>>>>>> main

const app = express();
const port = process.env.PORT;

app.use(express.json());
<<<<<<< HEAD
app.use("/api", priceEstimationRoutes);
=======
>>>>>>> main

app.listen(port, () => {
  console.log(`running Server on http://localhost:${port}`);
});





