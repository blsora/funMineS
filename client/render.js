var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d')

var header = document.getElementById('header');

header.style.height = (window.innerHeight / 8) + "px";
header.style.width =  document.body.clientWidth + "px";

var W = canvas.width = document.body.clientWidth;
var H = canvas.height = window.innerHeight - (window.innerHeight / 7);

var BLOCK_W = W / COLS, 
    BLOCK_H = H / ROWS;

var colors = [
    'blue', 'darkgreen', 'red', 'navyblue', 
    'darkred', 'cyan', 'purple', 'black'
];

var bombIcon = new Image();
bombIcon.src = 'land-mine.svg';

var flagIcon = new Image();
flagIcon.src = 'Red-Flag.svg';


function renderNumber (x,y) {
    var viewCoordinates = modelToView(x, y);

    ctx.fillStyle = colors[board[y][x] - 1];
    ctx.font = '20pt Verdana'
    var textSizeM = ctx.measureText('M'),
        textSizeNumber = ctx.measureText(board[y][x])
    ctx.fillText(
        board[y][x], 
        viewCoordinates.x + Math.floor(BLOCK_W / 2) - textSizeNumber.width / 2, 
        viewCoordinates.y + Math.floor(BLOCK_H / 2) + textSizeM.width / 2
    ); 
}

function renderMine (x,y) {
    var viewCoordinates = modelToView(x, y);

    ctx.drawImage(bombIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
}

function renderFlag (x,y) {
    var viewCoordinates = modelToView(x, y);

    ctx.drawImage(flagIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
}

function modelToView (x,y) {
    return {
        x: x * BLOCK_W,
        y: y * BLOCK_H
    };

}

function viewToModel (x,y) {
    return {
        x: Math.floor(x / BLOCK_W),
        y: Math.floor(y / BLOCK_H)
    };

}

function renderBlock (x,y) {
    var viewCoordinates = modelToView(x, y);
    
    if (state[y][x] == STATE_OPENED) {
        ctx.fillStyle = '#E5DADA';
    } else {
        ctx.fillStyle = '#E59500';
    }
    
    ctx.strokeStyle = 'black';
    ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
    ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
    
    if (state[y][x] == STATE_FLAGGED) {
        renderFlag(x, y);
    }
        
    if(state[y][x] == STATE_OPENED) {
        switch (board[y][x]) {
            case 0:
                break;
            case BLOCK_MINE:
                renderMine(x, y);
                break;
            default:
                renderNumber(x, y);
        } 
    }
}

function render() {
	for (var y = 0; y < ROWS; ++y) {
		for (var x = 0; x < COLS; ++x) {
			renderBlock(x, y);
		}
	}
}

render();