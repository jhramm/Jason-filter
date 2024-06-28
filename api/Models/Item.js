const mongoose = require("mongoose");


const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

let Item = new mongoose.model("Item", ItemSchema);
module.exports = Item;