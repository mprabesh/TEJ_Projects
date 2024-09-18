let score = 0;
let timing=30; // 30secgame
let isStarted=false
let countDownTime=document.getElementById("countdown-time")
let myScore=document.querySelector('#score')

document.addEventListener("keydown", startGame); // this listens for keypress event to start game

function gamePlay(){
    let holes=document.querySelectorAll('.hole')
    let moleInterval=setInterval(()=>{ // this is for generating mole randomly
        let selectRandNum=Math.floor(Math.random()*holes.length)
        holes[selectRandNum].classList.add('mole')
        setTimeout(()=>{
            holes[selectRandNum].classList.remove('mole')
        },1500)
    },1500)

    let timeInterval=setInterval(()=>{ // this is for timer implementation
        document.getElementById("countdown-time").innerText=timing>9?`00:${timing}`:`00:0${timing}`
        if(timing===0){ // timer expires
            alert(`score : ${score}`)
            clearInterval(moleInterval)
            clearInterval(timeInterval)
            timing=30
            score=0
            myScore.innerText=score
            isStarted=false
        }
        --timing
    },1000)
    for(let k=0;k<9;k++){
        holes[k].addEventListener("click",isWhacked)
    }
    function isWhacked(e){
        if(e.target.classList.contains("mole")){ // Did we hit the mole?
            score = score+1
        }
        myScore.innerText=score
    }
}

function startGame(event){
if(event.key===" " && !isStarted){
    isStarted=true
    gamePlay() // this starts game with space key pressed
}
if(event.key==="Escape"){
    location.reload() // with escape key game is reloaded
}
}