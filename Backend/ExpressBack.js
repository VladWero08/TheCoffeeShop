// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");
const { response } = require("express");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/coffees", (req, res) => {
    const coffeeRecipes = readJSONFile();
    // in body we send the coffee added
    let newCoffee = req.body;
    newCoffee.id = uuid.v4.apply();
    coffeeRecipes.push(newCoffee);
    writeJSONFile(coffeeRecipes);

    res.status(200).send(coffeeRecipes);
});

// Read One
// app.get("/dogs/:id", (req, res) => {
//     const coffeeRecipes = readJSONFile();

// });

// Read All
app.get("/coffees", (req, res) => {
    const coffeeRecipes = readJSONFile();
    res.status(200).send(coffeeRecipes);
});

// Update
app.put("/coffees/:id", (req, res) => {
    const coffeeRecipes = readJSONFile();
    let changedCoffee = req.body;
    let id = req.params.id;
    for( let i = 0; i < coffeeRecipes.length; i++){
        console.log("Mama" + i);
        if( coffeeRecipes[i].id === id){
            coffeeRecipes[i].name = "Weroooo";
            coffeeRecipes[i].coffee = changedCoffee.coffee;
            coffeeRecipes[i].ingredients = changedCoffee.ingredients;
            writeJSONFile(coffeeRecipes);
            res.status(200).send("Coffee has been modified");
        }
    }
    res.status(200).send("There is no coffee with this id.");
});

// Delete
app.delete("/coffees/:id", (req, res) => {
    const coffeeRecipes = readJSONFile();
    let id = req.params.id;
    for( let i = 0; i < coffeeRecipes.length; i++){
        if( coffeeRecipes[i].id == id ){
            coffeeRecipes.splice(i,1);
            writeJSONFile(coffeeRecipes);
            res.status(200).send("Coffee has been deleted");
        }
    }
    res.status(200).send("There is no coffee with this id.");
});

// JSON Reading function
function readJSONFile() {
  return JSON.parse(fs.readFileSync("coffees.json"))["coffees"];
}

// JSON Writing function
function writeJSONFile(content) {
  fs.writeFileSync(
    "coffees.json",
    JSON.stringify({ coffees: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);