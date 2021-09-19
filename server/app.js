const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const path = require("path")
const router = require("./routers/router");
const subjectRouter = require("./routers/subjectRouter")
const {getFile} = require("./controllers/aws");
const { prototype } = require("./models/http-error");

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/uploads/images/:key",(req,res)=>{
  const fileKey = req.params.key;

  const readStream = getFile(fileKey);

  readStream.pipe(res);
})


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.use("/api/students", router);

app.use("/api/subjects",subjectRouter)

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {});
  }

  res
    .status(err.code || 500)
    .json(err.message || { message: "Something went wrong" });
});

try {
  mongoose
    .connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      app.listen(PORT, () => {
        console.log("Running on Port 5000");
      });
    });
} catch (err) {
  console.log(err);
}
