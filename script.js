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
var board=[[0,0,0],[0,0,0],[0,0,0]];

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
  modal2.style.display="none";
  statusupdate();
};

const OO = () => {
  xchance=false;
  modal2.style.display="none";
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
	if(!xchance) status.innerHTML="Current Chance: O";
	else status.innerHTML="Current Chance: X";
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

const change = (a) =>{
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
  if(won===false && ai===1) 
    {
      if(xchance) player=1;
      else player=-1;
      findBestMove();
      xchance=!xchance;
      checkGameStatus();
      statusupdate();
    }
};

opt1.addEventListener('click',aifunc)
opt2.addEventListener('click',aifunc2)
X.addEventListener('click',XX)
O.addEventListener('click',OO)

for(const cell of cells){
	cell.addEventListener('click',change);

};