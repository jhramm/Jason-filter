const express = require("express");
const cors = require("cors");

const Items = require("./Models/Item");

require("./DB/Conn");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/items", (req, res) => {
  try {
    const items = new Items(req.body);
    items
      .save()
      .then(() => {
        res.status(200).send(items);
      })
      .catch(() => {
        res.status(404).send("could not save item");
      });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/items", async (req, res) => {
  try {
    const allItems = await Items.find();
    res.status(200).send(allItems);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.post("/filteritems", async (req, res) => {
  try {
    const categories = req.body.categories;
    const data = await Items.find({ category: { $in: categories } });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
