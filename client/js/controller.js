//if(!game.sounds.ready) alert("Error while loading sounds.");

/*
canvas.addEventListener("click", function() 
{
     //toggleFullScreen()
}, false);

function toggleFullScreen() 
{
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
  else 
  {
    //cancelFullScreen.call(doc);
  }
}
*/

var onlongtouch;
var timer;
var touchduration = 500;

var restartButton = document.querySelector('#restart');
var soundButton = document.querySelector('#sound');
var infoButton = document.querySelector('#info');

canvas.addEventListener('mouseup', function(e) 
{
  if (game.ingame) 
  {
    var x = e.clientX - canvas.offsetLeft,
    y = e.clientY - canvas.offsetTop;
    var modelCoordinates = viewToModel(x, y);

    if(e.button == 0)
    {
      openBlock(modelCoordinates.x, modelCoordinates.y);
    }
    else if(e.button == 2)
    {
      flagBlock(modelCoordinates.x, modelCoordinates.y);
    }
    else
    {
      return false;
    }
    render();

    return false;
  } 
  else
  {
    gameRestart();
  }
});







canvas.addEventListener("touchstart", touchStartHandler, false);
canvas.addEventListener("touchend", () => (timer && clearTimeout(timer)), false);

function touchStartHandler(event) 
{
  alert("You pressed button: " + event.button);
  timer = setTimeout(() => onlongtouch(event), touchduration);
}

onlongtouch = function(e) 
{

  var x = e.touches[0].clientX - canvas.offsetLeft,
      y = e.touches[0].clientY - canvas.offsetTop;

  var modelCoordinates = viewToModel(x, y);
  
  flagBlock(modelCoordinates.x, modelCoordinates.y);

  render();
  return false;
};



canvas.addEventListener('contextmenu', function(e) {
   e.preventDefault();
   return false;
}, false);


restartButton.addEventListener("click", () => gameRestart(), false);

soundButton.addEventListener('click', function() 
{
    if (game.sounds.enabled) 
    {
      game.sounds.enabled = 0;
      soundButton.className = 'sound icon-mute'
    }
    else
    {
      game.sounds.enabled = 1;
      playAudio(0);
      soundButton.className = 'sound icon-sound'
    }
});

if (game.sounds.enabled)
  soundButton.className = 'sound icon-sound'
else 
  soundButton.className = 'sound icon-mute';

infoButton.addEventListener('click', function() 
{
  playAudio(0);
  alert("Info: One touch opens the block \n long touch places the flags \n Happy Fun Mines! :)");
});