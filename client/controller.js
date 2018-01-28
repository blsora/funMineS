var isSoundOn = true;

canvas.addEventListener("click", function() {
     //toggleFullScreen()
}, false);

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || 
                          docEl.mozRequestFullScreen || 
                          docEl.webkitRequestFullScreen || 
                          docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || 
                         doc.mozCancelFullScreen || 
                         doc.webkitExitFullscreen || 
                         doc.msExitFullscreen;

  if(!doc.fullscreenElement && 
     !doc.mozFullScreenElement && 
     !doc.webkitFullscreenElement && 
     !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    //cancelFullScreen.call(doc);
  }
}

canvas.addEventListener('mousedown', function(e) {
  if (playing) {
    var x = e.clientX - canvas.offsetLeft,
      y = e.clientY - canvas.offsetTop;

    var modelCoordinates = viewToModel(x, y);

    playLeftClickSound();
    openBlock(modelCoordinates.x, modelCoordinates.y);

    render();

    return false;
  } else {
    gameRestart();
  }
});

var restartButton = document.querySelector('#restart');
restartButton.addEventListener("touchstart", () => gameRestart(), false);

var onlongtouch;
var timer;
var touchduration = 500;

canvas.addEventListener("touchstart", touchStartHandler, false);
canvas.addEventListener("touchend", () => (timer && clearTimeout(timer)), false);

function touchStartHandler(event) {
     timer = setTimeout(() => onlongtouch(event), touchduration);
}

onlongtouch = function(e) {

  var x = e.touches[0].clientX - canvas.offsetLeft,
      y = e.touches[0].clientY - canvas.offsetTop;

  var modelCoordinates = viewToModel(x, y);
  playRightClickSound();
  flagBlock(modelCoordinates.x, modelCoordinates.y);

  render();
  return false;
};



canvas.addEventListener('contextmenu', function(e) {
   e.preventDefault();
   return false;
}, false);


var soundButton = document.querySelector('#sound');
var infoButton = document.querySelector('#info');

soundButton.addEventListener('touchstart', function() {
    if (isSoundOn) {
        soundButton.className = 'button'
        isSoundOn = false;
        return;
    }
    
    soundButton.className = 'button selected'
    isSoundOn = true;
    
});

infoButton.addEventListener('touchstart', function() {
   alert("Info: One touch opens the block \n long touch places the flags \n Happy Fun Mines! :)");
});