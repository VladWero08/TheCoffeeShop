// In this file we apply the logic of the elements 
const uuid = require("uuid");
const coffeeRepository = require('../repository/CoffeeListRepository');

module.exports.getAllCoffees = () => {
    const coffeeList = coffeeRepository.readJSONFile();
    return coffeeList;
}

module.exports.addCoffee = (newCoffee) => {
    const coffeeList = coffeeRepository.readJSONFile();
    newCoffee.id = uuid.v4.apply();
    coffeeList.push(newCoffee);
    coffeeRepository.writeJSONFile(coffeeList);
    return newCoffee;
}

module.exports.deleteCoffee = (coffeeID) => {
    const coffeeList = coffeeRepository.readJSONFile();
    let isValid = false;
    for(let i = 0; i < coffeeList.length; i++){
        if(coffeeList[i].id === coffeeID){
            coffeeList.splice(i,1);
            isValid = true;
            break;
        }
    }
    if(isValid) coffeeRepository.writeJSONFile(coffeeList);
    return isValid;
}

module.exports.editCoffee = (editedCoffee) => {
    const coffeeList = coffeeRepository.readJSONFile();
    let isValid = false;
    for(let i = 0; i < coffeeList.length; i++){
        if(coffeeList[i].id === editedCoffee.id){
            coffeeList[i].name = editedCoffee.name;
            coffeeList[i].coffee = editedCoffee.coffee;
            coffeeList[i].ingredients = editedCoffee.ingredients;
            isValid = true;
            break;
        }
    }
    if(isValid) coffeeRepository.writeJSONFile(coffeeList);
    return isValid;
}