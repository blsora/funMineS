var soundLeftClick = new Audio();         
soundLeftClick.src = "leftClick.mp3"; 
soundLeftClick.oncanplaythrough = function(){   
    soundLeftClick.readyToRock = true;
    soundLeftClick.volume = 0.9;           
};

var soundRightClick = new Audio();         
soundRightClick.src = "rightClick.mp3"; 
soundRightClick.oncanplaythrough = function(){   
    soundRightClick.readyToRock = true;      
};

var soundSad = new Audio();         
soundSad.src = "sad.mp3"; 
soundSad.oncanplaythrough = function(){   
    soundSad.readyToRock = true;          
};

var soundVictory = new Audio();         
soundVictory.src = "taDa.mp3"; 
soundVictory.oncanplaythrough = function(){   
    soundVictory.readyToRock = true;            
};


function playLeftClickSound(){
    if(soundLeftClick && soundLeftClick.readyToRock && isSoundOn){  
        soundLeftClick.currentTime = 0;       
        soundLeftClick.play();               
    }
}

function playRightClickSound(){
    if(soundRightClick && soundRightClick.readyToRock && isSoundOn){  
        soundRightClick.currentTime = 0;       
        soundRightClick.play();               
    }
}

function playSadSound(){
    if(soundSad && soundSad.readyToRock && isSoundOn){  
        soundSad.currentTime = 0;       
        soundSad.play();               
    }
}

function playVictorySound(){
    if(soundVictory && soundVictory.readyToRock && isSoundOn){  
        soundVictory.currentTime = 0;       
        soundVictory.play();               
    }
}