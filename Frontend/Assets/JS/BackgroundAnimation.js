const control_btns = document.getElementsByClassName("hm-right-btn");
const home_right = document.getElementsByClassName("home-right");
let count_background = 0;

function changeBackground(ph_index){
    const btn_url = "url('Assets/Images/template-ph" + ph_index + ".jpg')";
    home_right[0].style.backgroundImage = btn_url;
}

// Create control buttons for each background
for( let i = 0; i < control_btns.length; i++){
    control_btns[i].addEventListener("click", () => {
        changeBackground(i);
    });
}

// Once in 3s change the background image of home welcome section
window.setInterval( () => {
    count_background += 1;
    changeBackground(count_background % 4);
}, 3000);