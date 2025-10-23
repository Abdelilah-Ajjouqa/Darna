"use strict";
<<<<<<< HEAD
import mongoose from "mongoose";
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
>>>>>>> main
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error("no database URI found");
}
const connectionDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log("connection to the database is a Successs");
    }
    catch (err) {
        console.error(`Error connecting to the database: \n${err}`);
    }
};
exports.connectionDB = connectionDB;
