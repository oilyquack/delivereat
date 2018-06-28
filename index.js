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
    price: 6
  },
  2: {
    id: 2,
    name: "Black Bean Quesadillas",
    price: 5
  },
  3: {
    id: 3,
    name: "Guacamole",
    price: 2.5
  },
  4: {
    id: 4,
    name: "Frijoles",
    price: 3
  },
  5: {
    id: 5,
    name: "Chipotle Salsa",
    price: 3
  }
};

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

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
