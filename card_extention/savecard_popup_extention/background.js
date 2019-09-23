
var firebaseConfig = {
    apiKey: "AIzaSyAiah2Ftz0OLENUxvx9VaaojDJsa936NII",
    authDomain: "spud-93a30.firebaseapp.com",
    databaseURL: "https://spud-93a30.firebaseio.com",
    projectId: "spud-93a30",
    storageBucket: "spud-93a30.appspot.com",
    messagingSenderId: "111712193172",
    appId: "1:111712193172:web:5a61fc378f4e2290"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// listen to all messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    //highlight the extension icon
    if (request.todo == "showPageAction") {
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }

    else if (request.todo == "connectFirebase") {
        db.collection("ghostTrails").where("id", "==", "4").get()
        .then((snapshot) => {
            chrome.storage.local.set({'db': snapshot});
            snapshot.docs.forEach(doc => {
                    var data = doc.data()["card"];
                    if (data != "control") {
                        chrome.storage.local.set({'ghost': true});
                        if (data[0] == "s") {
                            chrome.storage.local.set({'social': true});
                        } else if (data[0] == "c") {
                            chrome.storage.local.set({'consequence': true});
                        }
                        chrome.storage.local.set({'stats': data[1]});
                    } else {
                        chrome.storage.local.set({'ghost': false});
                    }
                });
        })

        sendResponse({response: "success"});
    }

    else {
        console.log("Did not receive the response!!!")
    }
});
