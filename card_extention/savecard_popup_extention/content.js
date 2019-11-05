
window.addEventListener('load', function () {  
    connectDatabaseThenShowGhostTrails();
});

function connectDatabaseThenShowGhostTrails() {
    //request name property: todo, value: showpageaction
    chrome.runtime.sendMessage({todo: "showPageAction"});
    chrome.runtime.sendMessage({todo: "connectFirebase"});

    var id = "";
    var ghost = false;
    var type = "";
    var stats = "";
    var statement = "";

    chrome.storage.local.get(['partId','ghost','type','stats','statement'],function(result){
        id = result.partId;
        ghost = result.ghost;
        type = result.type;
        stats = result.stats;
        statement = result.statement;

        console.log('id: ' + id);
        console.log('ghost: ' + ghost);
        console.log('type: ' + type);
        console.log('stats: ' + stats);
        console.log('statement: ' + statement);
        webManipulation(ghost, type, stats, statement);
    });

}

function webManipulation(ghost, type, stats, statement) {

    var ghost_trails_div = document.createElement("div"); 
    ghost_trails_div.id = "ghost_trails_div";
    if (ghost == true) {
        ghost_trails_div.setAttribute("style","background-color:#ffcccc;height:180px;margin-top:20px;margin-bottom:30px");
    } else {
        ghost_trails_div.setAttribute("style","background-color:#ffcccc;height:120px;margin-top:20px;margin-bottom:30px");
    }

    if (document.getElementById("save-card-for-future-use-")) {
        console.log("in ghost trails");
        document.getElementsByClassName("save-card-for-future-use")[0].appendChild(ghost_trails_div);
        showGhostTrails(ghost, type, stats, statement);
    }

    //fake submit
    var submit_wrapper_div = document.getElementsByClassName("submit-button-wrapper")[0];
    var submit_button = submit_wrapper_div.getElementsByClassName("button")[0];
    // console.log("submit button", submit_button);

    submit_button.addEventListener('click', function(e) {
        console.log("pressed submit button")
        chrome.runtime.sendMessage({todo: "storeToFirebase"});
        e.preventDefault();
        window.location.href = "https://tony-peng.github.io/payment_success.html";
        // window.location.href = "http://localhost:8888/Tony-Peng.github.io/payment_success.html";
    });
}


function showGhostTrails(ghost, type, stats, statement) {

    var checkbox = document.getElementById("save-card-for-future-use-");
    var ghost_trails_div = document.getElementById("ghost_trails_div");

    var checkedHTML = 
            "<div style='padding:20px;'>" +
                "<b style='font-size:20px;color:black;'>NOTICE: Bank Card Saving Option Detected </b><br/>" + 
                "<p style='font-size:13px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</p><br/>" + 
                "<b style='font-size:13px;color:red'> " + type + "</b><br/>" + 
                "<ul'><li style='display:list-item;font-size:15px;color:black'><b><u>" + stats + "</u> " + statement + " </b></li></ul>" +
            "</div>";

    var uncheckedHTML = 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:black'>You Chose to Not Save Your Bank Card</b><br/>" + 
                "<p style='font-size:13px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</p><br>" + 
                "<b style='font-size:13px;color:red'> " + type + "</b><br/>" + 
                "<ul'><li style='display:list-item;font-size:15px;color:black'><b><u>" + stats + "</u> " + statement + " </b></li></ul>" +
            "</div>";

    var controlHTML = 
            "<div style='padding:20px;'>" +
                "<b style='font-size:20px;color:black;'>NOTICE: Bank Card Saving Option Detected </b><br/>" + 
                "<p style='font-size:13px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</p><br/>" + 
            "</div>";
    
    if (ghost == false) {
        ghost_trails_div.innerHTML= controlHTML;
        print("experiment group? ", ghost)
    } else {
        ghost_trails_div.innerHTML= checkedHTML;
        chrome.storage.local.set({'savecard': true});
        console.log('savecard: ' + true);
    }

    checkbox.addEventListener('change', function() {
        if(this.checked) {
            // Checkbox is checked..
            // ghost_trails_div.innerHTML= checkedHTML;
            chrome.storage.local.set({'savecard': true});
            console.log('savecard: ' + true);

        } else {
            // Checkbox is not checked..
            // ghost_trails_div.innerHTML= uncheckedHTML;
            chrome.storage.local.set({'savecard': false});
            console.log('savecard: ' + false);
        }
    });
}



