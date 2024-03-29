require('dotenv').config({path: '../.env'});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/index");

const app = express();

const mongoConnectURL = process.env.DB_CONNECT_URL;

// Allow requests from Vercel frontend
app.use(cors({
  origin: 'https://todoistclone.vercel.app'
}));

app.use(express.json());

app.use("/app", userRouter);


app.use(express.static("public"));
app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

mongoose.connect(
  `${mongoConnectURL}`,
  {
    dbName: "todoApp",
  }
);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000 ${mongoConnectURL}`);
});
