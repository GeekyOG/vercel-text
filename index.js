//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://admin-mena:07015168665@cluster0.smzsyju.mongodb.net/todoDB",
  { useNewUrlParser: true }
);
// mongoose.connect("mongodb://localhost:27017/todoDB", {useNewUrlParser: true});

const itemsSchema = {
  name: String,
  commpleted: Boolean,
};

const Item = mongoose.model("Item", itemsSchema);

const defaultItems = [
  { color: "red" },
  { color: "purple" },
  { color: "yellow" },
  { color: "blue" },
];

app.get("/api", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });

      res.send(foundItems);
    } else {
      res.send(foundItems);
    }
  });
});

app.post("/api", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
    commpleted: false,
  });
  item.save();
  res.send(item);
});

app.post("/api/delete", function (req, res) {
  const ItemId = req.body.id;

  Item.findByIdAndRemove(ItemId, function (err) {
    if (!err) {
      res.send("Successfully deleted checked item.");
    } else {
      res.send(err.message);
    }
  });
});

app.post("/api/update", function (req, res) {
  const ItemId = req.body.id;
  const item = req.body.item;

  Item.findByIdAndUpdate(ItemId, { name: item }, function (err, docs) {
    if (err) {
      console.log(err);
      res.send(docs);
    } else {
      console.log("Updated User : ", docs);
      res.send(docs);
    }
  });
});

app.post("/api/complete", function (req, res) {
  const ItemId = req.body.id;
  const completed = req.body.completed;

  Item.findByIdAndUpdate(
    ItemId,
    { commpleted: completed },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.send(docs);
      } else {
        console.log("Updated User : ", docs);
        res.send(docs);
      }
    }
  );
});

app.listen(process.env.PORT || 5005, function () {
  console.log("Server started on port 5000");
});
