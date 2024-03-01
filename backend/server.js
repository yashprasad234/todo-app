const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/index");

const app = express();

// Allow requests from Vercel frontend
app.use(cors({
  origin: 'https://todoistclone.vercel.app'
}));

app.use(express.json());

app.use("/app", userRouter);

mongoose.connect(
  "mongodb+srv://yashprasad272:magloo%4007@todo-app.ktz0jbz.mongodb.net/",
  {
    dbName: "todoApp",
  }
);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
