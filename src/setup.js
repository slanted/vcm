
var old = console.log;
console.log = (message) => {
    var logWindow = document.getElementById("logWindow");
    logWindow.innerHTML += message + "<br>";
    old(message);
}