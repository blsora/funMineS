var audioFiles =  // arrays START AT 0
[
    "left_click.mp3",
    "right_click.mp3",
    "sad.mp3",
    "tada.mp3"
];
    
function preloadAudio(url) 
{
    var audio = new Audio();
    audio.addEventListener('canplaythrough', loadedAudio, false);
    audio.src = "sounds/" + url;
}
    
var loaded = 0;
function loadedAudio()
{
    loaded++;
    if (loaded == audioFiles.length) initAudio(); // Precaching is finished.
}

var player = document.getElementById('player');
function playAudio(i) 
{
    if(game.sounds.enabled && game.sounds.ready)
    {
        player.src = "sounds/" + audioFiles[i];
        player.play();
        console.log("playing audio "+ audioFiles[i]);   
    }
    else
    {
        console.log("cant play audio "+ audioFiles[i]+" // game.sounds.enabled = "+game.sounds.enabled+"; game.sounds.ready = "+game.sounds.ready);
    }
}
/*
var player = document.getElementById('player');
function playAudio(index)
{
    if(game.sounds.enabled)
    {
        player.currentTime = 0;
        player.src = "../sounds/" + audioFiles[index];
        player.play();
    }
}
  */  
function initAudio()
{
    game.sounds.ready = 1;
    console.log("Loaded all Audio Files.");
}

for (var i in audioFiles) preloadAudio(audioFiles[i]);