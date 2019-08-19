//request name property: todo, value: showpageaction
chrome.runtime.sendMessage({todo: "showPageAction"});

if (document.getElementById("save-card-for-future-use-0")) {
    var ghost_trails_div = document.createElement("div"); 
    ghost_trails_div.id = "ghost_trails_div";
    ghost_trails_div.setAttribute("style","background-color:#ffcccc;height:350px;margin-top:40px");
    document.getElementsByClassName("save-card-for-future-use")[0].appendChild(ghost_trails_div); 
    showGhostTrails();
}

var validation_div = document.getElementsByClassName("chatHelp")[0];
var submit_wrapper_div = document.getElementsByClassName("submit-button-wrapper")[0];
var submit_button = submit_wrapper_div.getElementsByClassName("button")[0];

var new_button = document.createElement("BUTTON");
new_button.id = "newButton_id"
var t = document.createTextNode("CLICK ME");
new_button.appendChild(t);
// new_button.setAttribute('href', 'https://www.w3schools.com/html/');
// new_button.setAttribute('onclick', "location.href='http://google.com'");
// submit_wrapper_div.appendChild(new_button);
// submit_wrapper_div.replaceChild(new_button, submit_button);

console.log(submit_button)
submit_button.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "http://stackoverflow.com";
    // window.open("https://www.w3schools.com/html/");
});


function showGhostTrails() {

    var checkbox = document.getElementById("save-card-for-future-use-0");
    var ghost_trails_div = document.getElementById("ghost_trails_div");
    
    if(checkbox.checked == true) {
        //fill in ghost trails content
        ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:red'>NOTICE: You Chose to Save Your Bank Card!</b><br/><br/>" + 
                "<b style='font-size:16px;color:black'>Consequences:</b>" + 
                "<ul'><li style='display:list-item'>50% (100,000) of those who chose to save their credit card information had their banking account information leaked</li>" +
                "<li style='display:list-item'>5% (1,000) of those who chose to save their credit card information had their banking account information leaked</li></ul>" +
            "</div>" +
            "<div style='padding:20px'>" +
                "<b style='font-size:16px;color:black'>What did others do?</b><br/>" + 
                "Not save card: &nbsp;&nbsp;&nbsp; 90% <progress value='90' max='100'></progress><br/>" + 
                "Save card: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10% <progress value='10' max='100'></progress><br/>" +
                "Not save card: &nbsp;&nbsp;&nbsp; 65% <progress value='65' max='100'></progress><br/>" + 
                "Save card: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;35% <progress value='35' max='100'></progress>" +
            "</div>";

            console.log("checked");
    }

    checkbox.addEventListener('change', function() {
        if(this.checked) {
            // Checkbox is checked..
            ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:red'>NOTICE: You Chose to Save Your Bank Card!</b><br/><br/>" + 
                "<b style='font-size:16px;color:black'>Consequences:</b>" + 
                "<ul'><li style='display:list-item'>50% (100,000) of those who chose to save their credit card information had their banking account information leaked</li>" +
                "<li style='display:list-item'>5% (1,000) of those who chose to save their credit card information had their banking account information leaked</li></ul>" +
            "</div>" +
            "<div style='padding:20px'>" +
                "<b style='font-size:16px;color:black'>What did others do?</b><br/>" + 
                "Not save card: &nbsp;&nbsp;&nbsp; 90% <progress value='90' max='100'></progress><br/>" + 
                "Save card: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10% <progress value='10' max='100'></progress><br/>" +
                "Not save card: &nbsp;&nbsp;&nbsp; 65% <progress value='65' max='100'></progress><br/>" + 
                "Save card: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;35% <progress value='35' max='100'></progress>" +
            "</div>";
            console.log("checked");

        } else {
            // Checkbox is not checked..
            ghost_trails_div.innerHTML= 
            "<div style='padding:20px'>" +
                "<b style='font-size:20px;color:black'>You Chose to Not Save Your Bank Card</b><br/><br/>" + 
                "<b style='font-size:16px;color:black'>Consequences:</b>" + 
                "<ul'><li style='display:list-item'>50% (100,000) of those who chose to save their credit card information had their banking account information leaked</li>" +
                "<li style='display:list-item'>5% (1,000) of those who chose to save their credit card information had their banking account information leaked</li></ul>" +
            "</div>" +
            "<div style='padding:20px'>" +
                "<b style='font-size:16px;color:black'>What did others do?</b><br/>" + 
                "Not save card: &nbsp;&nbsp;&nbsp; 90% <progress value='90' max='100'></progress><br/>" + 
                "Save card: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10% <progress value='10' max='100'></progress><br/>" +
                "Not save card: &nbsp;&nbsp;&nbsp; 65% <progress value='65' max='100'></progress><br/>" + 
                "Save card: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;35% <progress value='35' max='100'></progress>" +
            "</div>";
            console.log("unchecked");
        }
    });
}



