const input_fields = document.getElementsByClassName("form-input");
const progession_container = document.getElementById("form-progression");
const progression_percent = document.getElementById("form-progression-percent");

function calculatePercent(){
    // increase each time we find a non-empty input field
    let completedFields = 0;
    for(let i = 0; i < input_fields.length; i++){
        if( input_fields[i].value !== "")
            completedFields++;
    }
    switch(completedFields){
        case 0:
            // if no field is completed, set the color to default
            // and the progress to 0 / 3
            progression_percent.innerHTML = "0 / 3";
            progession_container.style.background = "var(--c-main)";
            break;
        case 1:
            // background -> red, progress -> 1 / 3
            progression_percent.innerHTML = "1 / 3";
            progession_container.style.background = "#ff5050";
            break;
        case 2:
            // background -> yellow, progress -> 2 / 3
            progression_percent.innerHTML = "2 / 3";
            progession_container.style.background = "#ff9933";
            break;
        case 3:
            // background -> green, progress -> 3 / 3
            progression_percent.innerHTML = "3 / 3";
            progession_container.style.background = "#33cc33";
            break;
    }

}

// for( let i = 0; i < input_fields.length; i++){
//     // for each key stroke, reevaluate the state of the input fields
//     input_fields[i].addEventListener("keydown", calculatePercent);
// }