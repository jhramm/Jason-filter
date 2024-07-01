const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jhamiltonramm:1234@jasonhr.w3foonr.mongodb.net/filter-app"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
