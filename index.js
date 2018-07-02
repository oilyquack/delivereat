const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const menu = {
  1: {
    id: 1,
    name: "Plantain Tacos",
    description:
      "Beautiful crispy plantain in smokey chipotle sauce served in a soft white flour tortilla with feta and corriander.",
    price: 6
  },
  2: {
    id: 2,
    name: "Black Bean Quesadillas",
    description:
      "Black beans fried between two corn tortillas with cheddar cheese.",
    price: 5
  },
  3: {
    id: 3,
    name: "Guacamole",
    description:
      "Chunky avocado with tomato, onion, corriander, lime and salt. The good stuff, not the puree in the tub at the back of your fridge.",
    price: 2.5
  },
  4: {
    id: 4,
    name: "Frijoles",
    description: "Oh. My. God. Creamy beans with feta and chili. Get on board.",
    price: 3
  },
  5: {
    id: 5,
    name: "Chipotle Salsa",
    description: "Can you handle this? Tomatoey salsa to test your mettle.",
    price: 3
  }
};

let orders = {};

let orderId = 0;

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/menu", function(req, res) {
  res.json(menu);
});

app.get("/menu/:menuId", function(req, res) {
  if (menu[req.params.menuId]) {
    res.json(menu[req.params.menuId]);
  } else {
    res.status(404).json({ error: "Menu item not found" });
  }
});

app.post("/order", function(req, res) {
  orders = Object.assign({}, orders, { ["Order ID " + orderId++]: req.body });
  res.json({ orderId });
});

app.get("/admin", function(req, res) {
  res.json(orders);
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
