// HOME WORK 1 (PART 1)

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[A-Za-z_.]+@gmail.com$/;

gmailButton.onclick = () => {
    if(regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'ОК';
        gmailResult.style.color = 'green';
    }else{
        gmailResult.innerHTML = 'NOT OK';
        gmailResult.style.color = 'red';
    }
}

//HOME WORK 1 (PART 2)

const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const move = () => {
    if (positionX <= 450 && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
        setTimeout(move, 0);
    } else if (positionY < 450 && positionX >= 450) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
        setTimeout(move, 0);
    } else if (positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
        setTimeout(move, 0);
    } else if (positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
        setTimeout(move, 0);
    }
}

move();


// HOME WORK 2

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let intervalId;
let number = 0;
let counting = false; 

startBtn.addEventListener('click', () => {
    if (!counting) {
        counting = true;
        intervalId = setInterval(() => {
            number++;
            document.getElementById('secondsS').textContent = number;
        }, 1000);
    }
})

stopBtn.addEventListener('click', () => {
    if(counting){
        counting = false;
        clearInterval(intervalId);
    }
})

resetBtn.addEventListener('click', () => {
    if(counting){
        counting = false;
        clearInterval(intervalId);
    }
    number = 0;
    document.getElementById('secondsS').textContent = number;
})

    

function lines() {
    let sizeW = Math.random() * 22;
    let duration = Math.random() * 3;
    let e = document.createElement("div");
    e.setAttribute("class", "circle");
    document.body.appendChild(e);
    e.style.width = 12 + sizeW + "px";
    e.style.left = Math.random() * +innerWidth + "px";
    e.style.animationDuration = 2 + duration + "s";
  
    setTimeout(function () {
      document.body.removeChild(e);
    }, 5000);
  }
  setInterval(function () {
    lines();
  }, 200);
