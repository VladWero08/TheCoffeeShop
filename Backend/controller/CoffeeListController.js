const { Router } = require('express');
const express = require('express');
const router = express.Router();

const coffeService = require('../service/CoffeeListService');

// Read All
router.get("/coffees", (req, res) => {
    const coffeeRecipes = coffeService.getAllCoffees();
    if( coffeeRecipes !== undefined && coffeeRecipes.length !== 0)
        res.status(200).send(coffeeRecipes);
    else 
        res.status(204).send("There are no dogs to be displayed!");
});

// Create
router.post("/coffees", (req, res) => {
    const newCoffee = coffeService.addCoffee(req.body);
    res.status(200).send(newCoffee);
});

// Delete
router.delete("/coffees/:id", (req, res) => {
    const deletedCoffee = coffeService.deleteCoffee(req.params.id);
    if(deletedCoffee) 
        res.status(200).send("Coffee has been deleted");
    else 
        res.status(200).send("There is no coffee with this id.");
});

// Update
router.put("/coffees/:id", (req, res) => {
    const editedCoffee = {
        id: req.params.id,
        name: req.body.name,
        coffee: req.body.coffee,
        ingredients: req.body.ingredients
    };
    const editedCoffeeExists = coffeService.editCoffee(editedCoffee);
    if(editedCoffeeExists)
        res.status(200).send("Coffee has been modified");
    else
        res.status(200).send("There is no coffee with this id.");
});


module.exports = router;