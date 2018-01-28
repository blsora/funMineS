var duration = document.getElementById("duration");
var myVar;

function startTimer() {
    var timer = 0;
    var counter = 0;
    duration.innerHTML = counter;
    myVar = setInterval(() => {
        counter = counter +1
        duration.innerHTML = counter
    }, 1000) 
 }

function stopTimer() {
    clearInterval(myVar);
 }