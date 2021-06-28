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

