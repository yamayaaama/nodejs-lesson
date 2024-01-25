const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
const env = require("dotenv");
env.config();

const PORT = 3000;

app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", taskRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log("sever started!!"));
  } catch(err) {
    console.log(err);
  }
}

start();