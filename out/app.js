"use strict";
require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const dbConnect = require(__dirname + "/config/db_config");
dbConnect();
const app = express();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`running Server on http://localhost:${port}`);
});
