// src="https://www.gstatic.com/firebasejs/6.3.5/firebase-app.js";
// src="https://www.gstatic.com/firebasejs/6.3.5/firebase-firestore.js";
// var firebaseConfig = {
//     apiKey: "AIzaSyAiah2Ftz0OLENUxvx9VaaojDJsa936NII",
//     authDomain: "spud-93a30.firebaseapp.com",
//     databaseURL: "https://spud-93a30.firebaseio.com",
//     projectId: "spud-93a30",
//     storageBucket: "spud-93a30.appspot.com",
//     messagingSenderId: "111712193172",
//     appId: "1:111712193172:web:5a61fc378f4e2290"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// console.log(db);


//request name property: todo, value: showpageaction
chrome.runtime.sendMessage({todo: "showPageAction"});

window.addEventListener('load', function () {
    var id = localStorage.getItem("id");
    var cookie = document.cookie;
    // console.log(cookie);
    console.log(cookie.split("=")[1]);

    console.log("id: ",id);

    if (document.getElementById("save-card-for-future-use-0")) {
        var ghost_trails_div = document.createElement("div"); 
        ghost_trails_div.id = "ghost_trails_div";
        ghost_trails_div.setAttribute("style","background-color:#ffcccc;height:250px;margin-top:40px");
        document.getElementsByClassName("save-card-for-future-use")[0].appendChild(ghost_trails_div);
        console.log("will show ghost trails next"); 
        showGhostTrails();
    }

    //fake submit
    var validation_div = document.getElementsByClassName("chatHelp")[0];
    var submit_wrapper_div = document.getElementsByClassName("submit-button-wrapper")[0];
    console.log("wrapper: ", submit_wrapper_div);
    var submit_button = submit_wrapper_div.getElementsByClassName("button")[0];
    console.log("submit button: ", submit_button);

    submit_button.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = "http://stackoverflow.com";
        // window.open("https://www.w3schools.com/html/");
    });
});


function showGhostTrails() {

    console.log("show ghost trails");

    var checkbox = document.getElementById("save-card-for-future-use-0");
    var ghost_trails_div = document.getElementById("ghost_trails_div");
    
    if(checkbox.checked == true) {
        //fill in ghost trails content
        ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:red'>NOTICE: You Chose to Save Your Bank Card!</b><br/><br/>" + 
                "<b style='font-size:16px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</b><br/>" + 
                "<b style='font-size:16px;color:black'>Here’s what happened to other users: </b><br/><br/>" + 
                "<ul'><li style='display:list-item'>84% regretted their decision to save their credit card information </li>" +
                "<li style='display:list-item'>69% reported that their credit card data was compromised</li></ul>" +
            "</div>";

            console.log("checked");
    }

    checkbox.addEventListener('change', function() {
        if(this.checked) {
            // Checkbox is checked..
            ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:red'>NOTICE: You Chose to Save Your Bank Card!</b><br/><br/>" + 
                "<b style='font-size:16px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</b><br/>" + 
                "<b style='font-size:16px;color:black'>Here’s what happened to other users: </b><br/><br/>" + 
                "<ul'><li style='display:list-item'>84% regretted their decision to save their credit card information </li>" +
                "<li style='display:list-item'>69% reported that their credit card data was compromised</li></ul>" +
            "</div>";
            console.log("checked");

        } else {
            // Checkbox is not checked..
            ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:black'>You Chose to Not Save Your Bank Card</b><br/><br/>" + 
                "<b style='font-size:16px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</b><br/>" + 
                "<b style='font-size:16px;color:black'>Here’s what happened to other users: </b><br/><br/>" + 
                "<ul'><li style='display:list-item'>84% regretted their decision to save their credit card information </li>" +
                "<li style='display:list-item'>69% reported that their credit card data was compromised</li></ul>" +
            "</div>";
            console.log("unchecked");
        }
    });
}



