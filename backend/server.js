const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/app", userRouter);

mongoose.connect(
  "mongodb+srv://yashprasad272:kvC7N3dOuiwaIevB@todo-app.ktz0jbz.mongodb.net/",
  {
    dbName: "todoApp",
  }
);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
