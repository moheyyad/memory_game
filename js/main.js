let timer = 60;
let ez = document.getElementById("ez");
let nrml = document.getElementById("nrml");
let hell = document.getElementById("hell");

let flip = document.getElementById("flip");
let coin = document.getElementById("coin");  coin.volume = 0.2;
let winSound = document.getElementById("win");
let wrong = document.getElementById("wrong");
let lose = document.getElementById("lose");

let mark = document.querySelector(".myMark");

function deleteMe(){
    mark.classList.add("d-none");
}


ez.onclick = function(){
    
    timer = 91;
    
    startGame();
    
}

nrml.onclick = function(){
    
    timer = 71;
    
    startGame();
    
}

hell.onclick = function(){
    
    timer = 41;
    
    startGame();
    
}

function startGame (){

    let yourName = prompt("Enter your name");

    if(yourName === null || yourName === ""){

        document.querySelector(".name span").innerHTML = "Walter White";

    }else{

        document.querySelector(".name span").innerHTML = yourName;
    }    

    document.querySelector(".controls").classList.add("d-none");
    
    let intervel = setInterval(function(){
        timer--;
        document.querySelector(".timer span").innerHTML = timer + "s";

        if (timer == 0 ){
            gameOver();
            clearInterval(intervel);

        


        }
        let matchedBlocks = blocks.filter(block => block.classList.contains("matched"));
        if(matchedBlocks.length == blocks.length) {
            win();
            clearInterval(intervel);

        }
        
    
    },1000)
    


};    

let duration = 500;

let blocksContainer = document.querySelector(".gameContainer");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function(){

        flippBlock(block);

        flip.play();

    })

})

function flippBlock(selectedBlock){

    selectedBlock.classList.add("flipped");

    let flippedBlocks = blocks.filter(block => block.classList.contains("flipped"));

    if (flippedBlocks.length === 2){

        stopClicking();

        checkMatchedBlocks(flippedBlocks[0], flippedBlocks[1]);
        
    }

}

function stopClicking(){

    blocksContainer.classList.add("noClicking");

    setTimeout(() => {

        blocksContainer.classList.remove("noClicking");

    }, duration)

}

function checkMatchedBlocks(firstBlock, secondBlock) {

let tries = document.querySelector(".tries span");

if (firstBlock.dataset.img === secondBlock.dataset.img) {

    coin.play();


    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");


}else{

    wrong.play();

    tries.innerHTML = parseInt(tries.innerHTML)+1;

    setTimeout(() => {

        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");
    
    }, duration)


}

}

function shuffle(array){

    let current = array.length,
    temp,
    random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }
}

let matchedBlocks = blocks.filter(block => block.classList.contains("matched"));
if(matchedBlocks.length == blocks.length) {
    win();
}

function gameOver() {

    lose.play();

    document.querySelector('.gameOver').classList.remove("d-none");

    resetAll();


}

function win() {

    winSound.play();

    document.querySelector('.win').classList.remove("d-none");

    resetAll();


}

function resetAll(){

    setTimeout(() => {

        document.querySelector('.gameOver').classList.add("d-none");

        document.querySelector('.win').classList.add("d-none");

        document.querySelector(".controls").classList.remove("d-none");

        document.querySelector(".tries span").innerHTML = 0;

        blocks.forEach((block) => {
            block.classList.remove("flipped");
            block.classList.remove("matched")

        })


    }, 4000)

}
/*

Timer with game over;

best scores

*/ 