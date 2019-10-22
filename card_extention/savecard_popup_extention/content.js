
window.addEventListener('load', function () {  
    connectDatabaseThenShowGhostTrails();
});

function connectDatabaseThenShowGhostTrails() {
    //request name property: todo, value: showpageaction
    chrome.runtime.sendMessage({todo: "showPageAction"});
    chrome.runtime.sendMessage({todo: "connectFirebase"});

    var ghost = false;
    var type = "";
    var stats = "";
    var statement = "";

    chrome.storage.local.get(['ghost','type','stats','statement'],function(result){
        ghost = result.ghost;
        type = result.type;
        stats = result.stats;
        statement = result.statement;

        console.log('ghost: ' + ghost);
        console.log('type: ' + type);
        console.log('stats: ' + stats);
        console.log('statement: ' + statement);
        webManipulation(ghost, type, stats, statement);
    });

}

function webManipulation(ghost, type, stats, statement) {
    if (document.getElementById("save-card-for-future-use-") && ghost == true) {
        var ghost_trails_div = document.createElement("div"); 
        ghost_trails_div.id = "ghost_trails_div";
        ghost_trails_div.setAttribute("style","background-color:#ffcccc;height:170px;margin-top:30px;margin-bottom:30px");
        document.getElementsByClassName("save-card-for-future-use")[0].appendChild(ghost_trails_div);
        showGhostTrails(ghost, type, stats, statement);
    }

    //fake submit
    var validation_div = document.getElementsByClassName("chatHelp")[0];
    var submit_wrapper_div = document.getElementsByClassName("submit-button-wrapper")[0];
    var submit_button = submit_wrapper_div.getElementsByClassName("button")[0];

    submit_button.addEventListener('click', function(e) {
        e.preventDefault();
        chrome.runtime.sendMessage({todo: "storeToFirebase"});
        window.location.href = "http://localhost:8888/Tony-Peng.github.io/payment_success.html";
    });
}


function showGhostTrails(ghost, type, stats, statement) {

    var checkbox = document.getElementById("save-card-for-future-use-");
    var ghost_trails_div = document.getElementById("ghost_trails_div");

    var checkedHTML = 
            "<div style='padding:20px;'>" +
                "<b style='font-size:20px;color:red;'>NOTICE: You Chose to Save Your Bank Card!</b><br/>" + 
                "<p style='font-size:13px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</p>" + 
                "<b style='font-size:13px;color:red'> " + type + "</b><br/>" + 
                "<ul'><li style='display:list-item;font-size:15px;color:black'><b><u>" + stats + "</u> " + statement + " </b></li></ul>" +
            "</div>";

    var uncheckedHTML = 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:black'>You Chose to Not Save Your Bank Card</b><br/>" + 
                "<p style='font-size:13px;color:black'>Saving your credit card will make future purchases with Hollister easier, but could also make your credit card information more vulnerable to being leaked.</p>" + 
                "<b style='font-size:13px;color:red'> " + type + "</b><br/>" + 
                "<ul'><li style='display:list-item;font-size:15px;color:black'><b><u>" + stats + "</u> " + statement + " </b></li></ul>" +
            "</div>";

    
    if(checkbox.checked == true) {
        //fill in ghost trails content
        ghost_trails_div.innerHTML= checkedHTML;
        chrome.storage.local.set({'savecard': true});
    }

    checkbox.addEventListener('change', function() {
        if(this.checked) {
            // Checkbox is checked..
            ghost_trails_div.innerHTML= checkedHTML;
            chrome.storage.local.set({'savecard': true});

        } else {
            // Checkbox is not checked..
            ghost_trails_div.innerHTML= uncheckedHTML;
            chrome.storage.local.set({'savecard': false});
        }
    });
}



