const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("no database URI found");
}

const connectionDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connection to the database is a Successs");
  } catch (err) {
    console.error(`Error connecting to the database: \n${err}`);
  }
};

module.exports = connectionDB;
