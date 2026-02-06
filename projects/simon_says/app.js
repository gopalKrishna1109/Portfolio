let started = false;
let level = 0;
let highestScore = 0;

let h4 = document.querySelector("h4");

let h2 = document.querySelector("h2");
let btns = ["yellow","green","red","blue"];

let gameSeq = [];
let userSeq = [];

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is started");
        started = true;
    }

    levelUp();
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("black");
    setTimeout(function(){
        btn.classList.remove("black");
    },250);
}

function gameOver(){
    const originalBgColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "red";
    setTimeout(()=>{
        document.body.style.backgroundColor = originalBgColor;
    },250);
}

function levelUp(){
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() *4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    
    gameFlash(randBtn);
}

function checkAns(idx){
    
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1250);
        }
    }else{
        gameOver();
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to restart.`;
        if(level > highestScore){
            highestScore = level-1;
            h4.innerHTML = `Your Highest Score is <b>${highestScore}</b>`
        }
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn")
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}