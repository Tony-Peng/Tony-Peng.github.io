
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

var id;

function setId(participantId) {
    id = participantId;
    console.log("id from firebase: ", id);
}

// listen to all messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    //highlight the extension icon
    if (request.todo == "showPageAction") {
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }

    else if (request.todo == "connectFirebase") {

        db.collection("mockResult").orderBy("time", "desc").limit(1).get()
            .then((snapshot) => {
                console.log(snapshot)
                snapshot.docs.forEach(doc => {
                    console.log(doc.data()['id']);
                    setId(doc.data()['id']);
                });
            });

        db.collection("ghostTrails").where("id", "==", id).get()
        .then((snapshot) => {
            chrome.storage.local.set({'db': snapshot});
            snapshot.docs.forEach(doc => {
                    var data = doc.data()["card"];
                    if (data != "control") {
                        chrome.storage.local.set({'ghost': true});
                        if (data[0] == "s") {
                            chrome.storage.local.set({'type': "Here's what other users did:"});
                        } else if (data[0] == "c") {
                            chrome.storage.local.set({'type': "Here’s what happened to other users:"});
                        }
                        chrome.storage.local.set({'stats': data[1]});
                        chrome.storage.local.set({'statement': data[2]});
                    } else {
                        chrome.storage.local.set({'ghost': false});
                    }
                    chrome.storage.local.set({'partId': id});
                });
        })

        sendResponse({response: "success"});
    }

    else if (request.todo == "storeToFirebase") {
        chrome.storage.local.get('savecard',function(result) {
            db.collection("mockResult").add({
                id: id,
                card: result.savecard,
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            });
            
        });

        // db.collection("mockResult").where("id", "==", id).get()
        //     .then((snapshot) => {
        //         snapshot.docs.forEach(doc => {
        //             doc.ref.update({card: result.savecard})
        //             .then(function(docRef) {
        //                 console.log("Document written with ID: ", docRef.id);
        //             });
        //         });         
        //     });
        sendResponse({response: "success"});
    }

    else {
        console.log("Did not receive the response!!!")
    }
});
