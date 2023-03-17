const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Connected to DataBase ${name} at: ${host}`);
  } catch (error) {
    console.log("Error trying to connect to DataBase", error);
  }
};

module.exports = { connectDb, DB_URL };
