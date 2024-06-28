const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/filter-app")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
