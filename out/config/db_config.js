"use strict";
import mongoose from "mongoose";
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error("no database URI found");
}
const connectionDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connection to the database is a Successs");
    }
    catch (err) {
        console.error(`Error connecting to the database: \n${err}`);
    }
};
module.exports = connectionDB;
