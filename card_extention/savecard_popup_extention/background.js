
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


//listen to all messages, highlight the extension icon
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "showPageAction")
    {
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }

    if (request.todo == "connectFirebase")
    {
        console.log("firebase: ", db);
    }
});
