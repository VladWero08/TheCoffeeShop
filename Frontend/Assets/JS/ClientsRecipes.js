const btn_submit_coffee = document.getElementById("btn-build-submit");
btn_submit_coffee.addEventListener("click", addCoffee);

function modifyCoffeIngredients(coffee){
    // delete 'Your coffee: '
    coffee = coffee.slice(13);
    // delete the last ','
    coffee = coffee.slice(0,-1);
    return coffee;
}

function verifiyInputs(name, coffee, ingredients){
    // if the inputs are empty, alert the user
    if( name === "" || coffee === "" || ingredients === "")
        alert("All inputs need to be completed!");
    else
        return true;
}


function fetchCoffees(){
    let body = document.getElementsByName("body")[0];
    
    let coffee_list = document.getElementById("coffee-list");
    coffee_list.innerHTML = "<h3 class='loading-text'>Please wait, we are fetching your recipes...</h3>";

    fetch('http://localhost:3000/coffees', {
        method: 'get'
    }).then( (resp) => {
        resp.json().then( (data) => {
            if ( data.length )
                coffee_list.innerHTML = "";
            
            for ( let i = 0; i < data.length; i++){
                coffee_recipe = document.createElement("li");
                coffee_recipe.setAttribute("class","coffee-list-recipe");

                // get the client's name
                coffee_recipe_name = document.createElement("h1");
                coffee_recipe_name.innerText = data[i].coffee;
                coffee_recipe.appendChild(coffee_recipe_name);

                // get the client's name
                coffee_recipe_owner = document.createElement("h3");
                coffee_recipe_owner.innerHTML = "Created by <br />" + data[i].name;
                coffee_recipe.appendChild(coffee_recipe_owner);

                // get the recipe's ingredients
                coffe_ingredients = document.createElement("p");
                coffe_ingredients.innerText = data[i].ingredients;
                coffee_recipe.appendChild(coffe_ingredients);

                // add delete buttton
                delete_btn = document.createElement("button");
                delete_btn.innerText = "X";
                delete_btn.setAttribute("class", "btn-delete-coffee");
                delete_btn.onclick = () => {
                    removeCoffee(data[i].id);
                };
                coffee_recipe.appendChild(delete_btn);

                // add edit button
                edit_btn = document.createElement("button");
                edit_btn.innerHTML = '<img src="../Images/edit.png" alt="edit_img">';
                edit_btn.setAttribute("class", "btn-edit-coffee");
                edit_btn.addEventListener("click", () => {
                    // get the values of the recipe selected and put them inside the inputs
                    document.getElementById("your-name").value = data[i].name;
                    document.getElementById("your-cof-name").value = data[i].coffee;
                    document.getElementById("your-coffee").innerText = "Your coffee: ";
                    
                    // remove the addCoffee function from the submit button
                    // make it yellow, and change the text inside
                    btn_submit_coffee.removeEventListener("click", addCoffee);
                    btn_submit_coffee.onclick = () => {
                        editCoffee(data[i].id);
                    };
                    btn_submit_coffee.innerText = "Edit";
                    btn_submit_coffee.style.background = "rgb(185, 178, 73)";
                })

                coffee_recipe.appendChild(edit_btn);

                coffee_list.appendChild(coffee_recipe);
            }
        })
    })
}

fetchCoffees();

function addCoffee(){
    // get the inputs value
    let coffee_owner_name = document.getElementById("your-name").value;
    let coffee_name = document.getElementById("your-cof-name").value;
    let coffee_ingredients = modifyCoffeIngredients(document.getElementById("your-coffee").innerText);

    // if the inputs are not empty
    if(verifiyInputs(coffee_owner_name, coffee_name, coffee_ingredients)){
        let newCoffee = {
            name: coffee_owner_name,
            coffee: coffee_name,
            ingredients: coffee_ingredients 
        }
    
        fetch("http://localhost:3000/coffees", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCoffee)
        }).then( (resp) => {
            window.location.reload();
        })
    }

}

function editCoffee(id){
    // get the inputs value
    let coffee_owner_name = document.getElementById("your-name").value;
    let coffee_name = document.getElementById("your-cof-name").value;
    let coffee_ingredients = modifyCoffeIngredients(document.getElementById("your-coffee").innerText);

    // if the inputs are not empty
    if(verifiyInputs(coffee_owner_name, coffee_name, coffee_ingredients)){
        let newCoffee = {
            name: coffee_owner_name,
            coffee: coffee_name,
            ingredients: coffee_ingredients 
        }
    
        fetch("http://localhost:3000/coffees/" + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCoffee)
        }).then( (resp) => {
            window.location.reload();
        })
    }
}

function removeCoffee(id){
    fetch("http://localhost:3000/coffees/" + id, {
        method: "delete",
        headers:{
            "Content-Type": "application/json"
        }
    }).then( (resp) => {
        window.location.reload();
        console.log(response);
    });
}