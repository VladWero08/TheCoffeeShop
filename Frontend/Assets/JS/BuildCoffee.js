const coffee_ingredients = document.getElementsByClassName("ingredient");
const coffee_btns = document.getElementsByClassName("card-select");
let user_coffee = document.getElementById("your-coffee");
let user_ingredients = [];

// Generate the user's recipe
function userRecipe(){
    let user_recipe = "Your coffee: ";
    for(let i = 0; i < user_ingredients.length; i++){
        user_recipe = user_recipe + user_ingredients[i] + ", ";
    }
    user_coffee.innerHTML = user_recipe;
    console.log(user_coffee.innerHTML);
}

// Add ingredient to the recipe
function addUserRecipe(index){
    user_ingredients.push(coffee_ingredients[index].innerHTML);
    userRecipe();
}

// Remove ingredient from user's recipe
function removeUserRecipe(index){
    const poz = user_ingredients.indexOf(coffee_ingredients[index].innerHTML); 
    for(let i = poz; i < user_ingredients.length; i++){
        user_ingredients[i] = user_ingredients[i+1];
    }
    user_ingredients.pop();
    userRecipe();
}

for(let i = 0; i < coffee_btns.length; i++){
    const index = i;
    coffee_btns[i].addEventListener("click", () => {
        // when clicked, the button will change its state and size
        if( coffee_btns[index].innerHTML === "+"){
            coffee_btns[index].style.fontSize = "20px";
            coffee_btns[index].innerHTML = "✔️";
            addUserRecipe(index);
        } else{
            coffee_btns[index].style.fontSize = "25px";
            coffee_btns[index].innerHTML = "+";
            removeUserRecipe(index);
        }
    });
}



