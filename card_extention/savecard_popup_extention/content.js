
window.addEventListener('load', function () {  
    connectDatabaseThenShowGhostTrails();
});

function connectDatabaseThenShowGhostTrails() {
    //request name property: todo, value: showpageaction
    chrome.runtime.sendMessage({todo: "showPageAction"});
    chrome.runtime.sendMessage({todo: "connectFirebase"});

    var ghost = false;
    var social = false;
    var stats = "";

    chrome.storage.local.get(['ghost','social','stats'],function(result){
        ghost = result.ghost;
        social = result.social;
        stats = result.stats;
        console.log('ghost: ' + ghost);
        console.log('social: ' + social);
        console.log('stats: ' + stats);
        webManipulation(ghost, social, stats);
    });

}

function webManipulation(ghost, social, stats) {
    if (document.getElementById("save-card-for-future-use-0") && ghost == true) {
        var ghost_trails_div = document.createElement("div"); 
        ghost_trails_div.id = "ghost_trails_div";
        ghost_trails_div.setAttribute("style","background-color:#ffcccc;height:170px;margin-top:30px");
        document.getElementsByClassName("save-card-for-future-use")[0].appendChild(ghost_trails_div);
        showGhostTrails();
    }

    //fake submit
    var validation_div = document.getElementsByClassName("chatHelp")[0];
    var submit_wrapper_div = document.getElementsByClassName("submit-button-wrapper")[0];
    var submit_button = submit_wrapper_div.getElementsByClassName("button")[0];

    submit_button.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = "http://stackoverflow.com";
        // window.open("https://www.w3schools.com/html/");
    });
}


function showGhostTrails() {

    var checkbox = document.getElementById("save-card-for-future-use-0");
    var ghost_trails_div = document.getElementById("ghost_trails_div");
    
    if(checkbox.checked == true) {
        //fill in ghost trails content
        ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:red'>NOTICE: You Chose to Save Your Bank Card!</b><br/>" + 
                "<p style='font-size:13px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</p>" + 
                "<b style='font-size:13px;color:red'>Here’s what happened to other users: </b><br/>" + 
                "<ul'><li style='display:list-item;font-size:15px;color:black'><b><u>Most users</u> regretted the decision to save credit card info</b></li>" +
                "<li style='display:list-item;font-size:15px;color:black'><b><u>Most users</u> reported their credit card data was compromised</b></li></ul>" +
            "</div>";
    }

    checkbox.addEventListener('change', function() {
        if(this.checked) {
            // Checkbox is checked..
            ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:red'>NOTICE: You Chose to Save Your Bank Card!</b><br/>" + 
                "<p style='font-size:13px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</p>" + 
                "<b style='font-size:13px;color:red'>Here’s what happened to other users: </b><br/>" + 
                "<ul'><li style='display:list-item;font-size:15px;color:black'><b><u>Most users</u> regretted the decision to save credit card info</b></li>" +
                "<li style='display:list-item;font-size:15px;color:black'><b><u>Most users</u> reported their credit card data was compromised</b></li></ul>" +
            "</div>";

        } else {
            // Checkbox is not checked..
            ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:black'>You Chose to Not Save Your Bank Card</b><br/>" + 
                "<p style='font-size:13px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</p>" + 
                "<b style='font-size:13px;color:red'>Here’s what happened to other users: </b><br/>" + 
                "<ul'><li style='display:list-item;font-size:15px;color:black'><b><u>Most users</u> regretted the decision to save credit card info</b></li>" +
                "<li style='display:list-item;font-size:15px;color:black'><b><u>Most users</u> reported their credit card data was compromised</b></li></ul>" +
            "</div>";
        }
    });
}



