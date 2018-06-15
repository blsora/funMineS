const colors = 
[
    'blue', 'darkgreen', 'red', 'navyblue', 
    'darkred', 'cyan', 'purple', 'black'
];

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d')

header = document.getElementById('header');



function calcSize()
{
    //header.style.height = (window.innerHeight / 8) + "px";
    //header.style.width =  document.body.clientWidth + "px";

    var W = canvas.width = document.body.clientWidth;
    var H = canvas.height = window.innerHeight - (window.innerHeight / 10);

    BLOCK_W = W / COLS;
    BLOCK_H = H / ROWS;    
}

calcSize();
window.onresize = redraw;

function vh(v) 
{
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return ((((v * h) / 100)/3)*2);
}

function renderNumber (x,y) 
{
    var viewCoordinates = modelToView(x, y);

    ctx.fillStyle = colors[board[y][x] - 1];
    ctx.font = vh(10)+'px Verdana'
    var textSizeM = ctx.measureText('M'),
        textSizeNumber = ctx.measureText(board[y][x]);
    ctx.fillText(
        board[y][x], 
        viewCoordinates.x + Math.floor(BLOCK_W / 2) - textSizeNumber.width / 2, 
        viewCoordinates.y + Math.floor(BLOCK_H / 2) + textSizeM.width / 2
    ); 
}

function renderMine (x,y) 
{
    var viewCoordinates = modelToView(x, y);

    ctx.fillStyle = colors[2];
    ctx.font = vh(10)+'px icomoon'
    var textSizeM = ctx.measureText('M'),
        textSizeNumber = ctx.measureText(board[y][x]);
    ctx.fillText(
        String.fromCharCode(parseInt('\e900', 16)),
        viewCoordinates.x + Math.floor(BLOCK_W / 2) - textSizeNumber.width / 2, 
        viewCoordinates.y + Math.floor(BLOCK_H / 2) + textSizeM.width / 2
    ); 
}

function renderFlag (x,y) 
{
    var viewCoordinates = modelToView(x, y);
    ctx.fillStyle = colors[2];
    ctx.font = vh(10)+'px icomoon'
    var textSizeM = ctx.measureText('M'),
        textSizeNumber = ctx.measureText(board[y][x]);
    ctx.fillText(
        String.fromCharCode(parseInt('\e901', 16)),
        viewCoordinates.x + Math.floor(BLOCK_W / 2) - textSizeNumber.width / 2, 
        viewCoordinates.y + Math.floor(BLOCK_H / 2) + textSizeM.width / 2
    );
}

function modelToView (x,y) 
{
    return {
        x: x * BLOCK_W,
        y: y * BLOCK_H
    };

}

function viewToModel (x,y) 
{
    return {
        x: Math.floor(x / BLOCK_W),
        y: Math.floor(y / BLOCK_H)
    };

}

function renderBlock (x,y) 
{

    var viewCoordinates = modelToView(x, y);
    
    ctx.fillStyle = (state[y][x] == STATE_OPENED) ? '#E5DADA':'#E59500';
    
    ctx.strokeStyle = 'black';
    ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
    ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
    
    if (state[y][x] == STATE_FLAGGED) 
    {
        renderFlag(x, y);
    }
        
    if(state[y][x] == STATE_OPENED) 
    {
        switch (board[y][x]) 
        {
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

function redraw() 
{
                ctx.width = window.innerWidth;
                ctx.height = window.innerHeight;
                calcSize();
                render();
}

function render() 
{
    for (var y = 0; y < ROWS; ++y) 
    {
        for (var x = 0; x < COLS; ++x) 
        {
            renderBlock(x, y);
        }
    }
}
