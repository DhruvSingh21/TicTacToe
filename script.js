const status = document.querySelector('.status-action');
const reset = document.querySelector('.reset');
const cells = document.querySelectorAll('.cell');
const modal = document.querySelector('.modal');
const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector('.modal2');
const stat = document.querySelector('.stat');
const opt1 = document.querySelector('#opt1');
const opt2 = document.querySelector('#opt2');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const X = document.querySelector('#X');
const O = document.querySelector('#O');

let xchance=false;
let won=false;
let ai=0;
let player=0;
let favour=0;
let chance=1;
var board=[[0,0,0],[0,0,0],[0,0,0]];
let ini=0;

function min(a,b)
{
  if(a<b) return a;
  else return b;
};

function max(a,b)
{
  if(a>b) return a;
  else return b;
};

function isfull()
{
    for (var row = 0; row<3; row++)
    {
         for (var col = 0; col<3; col++) if(board[row][col]===0) return 0;
    }
return 1;
};

function evaluate(player)
{
    for (var row = 0; row<3; row++)
    {
        if (board[row][0]===board[row][1] && board[row][1]===board[row][2])
        {
            if (board[row][0]===player) return 10;
            else if (board[row][0]===-player) return -10;
        }
    }
    for (var col = 0; col<3; col++)
    {
        if (board[0][col]===board[1][col] && board[1][col]===board[2][col])
        {
            if (board[0][col]===player) return 10;
            else if (board[0][col]===-player) return -10;
        }
    }
  
    if (board[0][0]===board[1][1] && board[1][1]===board[2][2])
    {
        if (board[0][0]===player) return 10;
        else if (board[0][0]===-player) return -10;
    }
    if (board[0][2]===board[1][1] && board[1][1]===board[2][0])
    {
        if (board[0][2]===player) return 10;
        else if (board[0][2]===-player) return -10;
    }
    return 0;
};

function minimax(isMax)
{
    var score = evaluate(favour);
    if(score===10) return 10;
    else if(score===-10) return -10;
    else if(isfull()===1 && score===0) return 0; 
    
    var tmp=player; 
    if(isMax)
    {
        var best = -1000;
        for (var i = 0; i<3; i++)
        {
            for (var j = 0; j<3; j++)
            {
                if (board[i][j]===0)
                {
                    player=tmp;
                    board[i][j] = player;
                    player*=-1;
                    best = max(best,minimax(!isMax));
                    board[i][j] = 0;
                }
            }
        }
        return best;
    }
 
    else
    {
        var worst = 1000;
        for (var i = 0; i<3; i++)
        {
            for (var j = 0; j<3; j++)
            {

                if (board[i][j]===0)
                {
                   player=tmp;
                    board[i][j] = player;
                     player*=-1;
                    worst = min(worst,minimax(!isMax));
                    board[i][j] = 0;
                }
            }
        }
        return worst;
    }
};

function findBestMove()
{
    var bestVal = -1000,row=-1,col=-1;
    var tmp=player;
    for (var i = 0; i<3; i++)
    {
        for (var j = 0; j<3; j++)
        {
            player=tmp;
            if (board[i][j]===0)
            {
                board[i][j]=player;
                favour=player;
                player*=-1;
                var moveVal = minimax(0);
                board[i][j] = 0;
                if (moveVal >= bestVal) row=i,col = j,bestVal = moveVal;   
            }
        }
    }
    player=tmp;
    board[row][col]=player;  
    if(player===1) cells[3*row+col].classList.add('x');
    else cells[3*row+col].classList.add('o');
};



const aifunc = () => {
  ai=0;
  modal1.style.display = "none";
  player1.innerHTML="Player 1: Human 1";
  player2.innerHTML="Player 2: Human 2";
  modal2.style.display="block";
};

const aifunc2 = () => {
  ai=1;
  modal1.style.display = "none";
  player1.innerHTML="Player 1: Human";
  player2.innerHTML="Player 2: Computer";
  modal2.style.display = "block";
};

const XX = () => {
  xchance=true;
  ini=1;
  modal2.style.display="none";
  statusupdate();
 
};

const OO = () => {
  xchance=true;
  modal2.style.display="none";
  ini=-1;
  if(chance===1 && ai===1) cmove();
  statusupdate();
};

const handleWin = (letter) => {
  if (letter === 'x') {
    status.innerHTML = "X has won!";
    stat.innerHTML = "X has won! ";

  } else {
    status.innerHTML = "O has won!";
    stat.innerHTML = "O has won!";
  }
   modal.style.display = "block";
};

const statusupdate = () =>{
  if(ai===0)
  {
	if(xchance && ini===1) status.innerHTML="Current Chance: Player 1";
  else if(xchance && ini===-1) status.innerHTML="Current Chance: Player 2";
  else if(!xchance && ini===1) status.innerHTML="Current Chance: Player 2";
	else if(!xchance && ini===-1) status.innerHTML="Current Chance: Player 1";
  }
  else if(ai===1)
  {
  status.innerHTML="Current Chance: Player";
  }
};

const checkGameStatus = () => {
  console.log(evaluate());
  const a = cells[0].classList[2];
  const b = cells[1].classList[2];
  const c = cells[2].classList[2];
  const d = cells[3].classList[2];
  const e = cells[4].classList[2];
  const f = cells[5].classList[2];
  const g = cells[6].classList[2];
  const h = cells[7].classList[2];
  const i = cells[8].classList[2];

  // check winner
  if (a && a === b && a === c) {
    handleWin(a);
    won=true;
    cells[0].classList.add('won');
    cells[1].classList.add('won');
    cells[2].classList.add('won');
  } else if (d && d === e && d === f) {
    handleWin(d);
    won=true;
    cells[3].classList.add('won');
    cells[4].classList.add('won');
    cells[5].classList.add('won');
  } else if (g && g === h && g === i) {
    handleWin(g);
    won=true;
    cells[6].classList.add('won');
    cells[7].classList.add('won');
    cells[8].classList.add('won');
  } else if (a && a === d && a === g) {
    handleWin(a);
    won=true;
    cells[0].classList.add('won');
    cells[3].classList.add('won');
    cells[6].classList.add('won');
  } else if (b && b === e && b === h) {
    handleWin(b);
    won=true;
    cells[1].classList.add('won');
    cells[4].classList.add('won');
    cells[7].classList.add('won');
  } else if (c && c === f && c === i) {
    handleWin(c);
    won=true;
    cells[2].classList.add('won');
    cells[5].classList.add('won');
    cells[8].classList.add('won');
  } else if (a && a === e && a === i) {
    handleWin(a);
    won=true;
    cells[0].classList.add('won');
    cells[4].classList.add('won');
    cells[8].classList.add('won');
  } else if (c && c === e && c === g) {
    handleWin(c);
    won=true;
    cells[2].classList.add('won');
    cells[4].classList.add('won');
    cells[6].classList.add('won');
  } else if (a && b && c && d && e && f && g && h && i) {
    empty=false;
    status.innerHTML = 'Game is Tied!';
    stat.innerHTML= "Game is Tied! ";
    modal.style.display = "block";
  } 
};

function move(a){
if(!(a.target.classList[2]==='x') && !(a.target.classList[2]=='o'))
  {
  if(xchance) a.target.classList.add('x');
  else a.target.classList.add('o');
  }
  else return;
  if(xchance) board[Math.floor(a.target.classList[1]/3)][a.target.classList[1]%3]=1;
  else board[Math.floor(a.target.classList[1]/3)][a.target.classList[1]%3]=-1;
  xchance=!xchance;
  checkGameStatus();
  statusupdate();
}

function cmove(){
  if(xchance) player=1;
  else player=-1;
  findBestMove();
  xchance=!xchance;
  checkGameStatus();
}
const change = (a) =>{
  if(ai===1) move(a),cmove();
  if(ai===0) move(a);
};

opt1.addEventListener('click',aifunc)
opt2.addEventListener('click',aifunc2)
X.addEventListener('click',XX)
O.addEventListener('click',OO)

for(const cell of cells){
	cell.addEventListener('click',change);
};