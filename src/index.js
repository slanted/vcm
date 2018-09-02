import './main.css';
import './setup.js';
import './elements/test.js';


function displayMessage(theMessage) {
    var message = document.getElementById("message");
    message.innerHTML = theMessage;
}

function sendMessage(theMessage) {
    displayMessage(theMessage);
    console.log("Sent message");
}

document.getElementById("sendMessage").addEventListener("click", ()=> {
    sendMessage("Normal Message");
});

document.getElementById("sendTimedMessage").addEventListener("click", ()=> {
    sendMessage("Timed message");
});