let rockBtn = document.querySelector('#rock-btn');
let paperBtn = document.querySelector('#paper-btn');
let scissorsBtn = document.querySelector('#scissors-btn');

let shootButton = document.querySelector('#shoot-button');
let nextButton = document.querySelector('#next-button');
let restartButton = document.querySelector('#restart-button');

let currContent = document.querySelector('#current-content');
let defContent = document.querySelector('#default-content');

let rpsBtnDefBG = 'blue';
let rpsBtnSelBG = 'purple';

let selectionMade = false;
let btnClickable = true;

let roundNum = 1;
let playerWins = 0;
let pcWins = 0;

let rpsButtonChoice = "";
    
let rpsButtons = [rockBtn, paperBtn, scissorsBtn];

nextButton.hidden = true;
shootButton.hidden = false;

//let userChoiceEntry = prompt("Round " + roundNum + "\nEnter rock, paper, or scissors.");

function gameButtonSelected(targ, bType){
    rpsButtonChoice = bType;
    selectionMade = true;

    for (let i=0; i<3; i++){
        if (i == bType){
            rpsButtons[i].style.background = rpsBtnSelBG;
        }
        else{
            rpsButtons[i].style.background = rpsBtnDefBG;
        }
    }
}

rockBtn.addEventListener('click', (e) => {
    if (btnClickable)
        gameButtonSelected(e.target, 0);
});
paperBtn.addEventListener('click', (e) => {
    if (btnClickable)
        gameButtonSelected(e.target, 1);
})
scissorsBtn.addEventListener('click', (e) => {
    if (btnClickable)
        gameButtonSelected(e.target, 2);
})

restartButton.addEventListener('click', function() {
    roundNum = 1;
    playerWins = 0;
    pcWins = 0;

    //userChoiceEntry = prompt("Round " + roundNum + "\nEnter rock, paper, or scissors.");

    shootButton.hidden = false;
    nextButton.hidden = true;
    btnClickable = true;

    rpsButtons.forEach(btn => {
        btn.style.background = 'blue';
    });
});

nextButton.addEventListener('click', function() {
    //userChoiceEntry = prompt("Round " + roundNum + "\nEnter rock, paper, or scissors.");
    currContent.textContent = currContent.textContent;
    defContent.hidden = false;

    rpsButtons.forEach(btn => {
        btn.style.background = 'blue';
    });
    btnClickable = true;
    selectionMade = false;
    nextButton.hidden = true;
    shootButton.hidden = false;
});

shootButton.addEventListener('click', function() {
    if (selectionMade){
        let alertString = getWinner(rpsButtonChoice, computerPlay());

        defContent.hidden = true;
        btnClickable = false;
        rpsButtons.forEach(btn => {
            btn.style.background = 'gray';
        });

        if (alertString == undefined)
            return;
        else{
            if (roundNum <= 5 && playerWins < 3 && pcWins < 3){
                shootButton.hidden = true;
                nextButton.hidden = false;
                alertString = alertString + "\n\nScore: \n\nPlayer - " + playerWins + " PC - " + pcWins;
                currContent.textContent = alertString;
                //alert(alertString);
            }
            else if (playerWins >= 3){
                nextButton.hidden = true;
                shootButton.hidden = true;
                alert("YOU WIN!");
            }
            else if (pcWins >= 3){
                nextButton.hidden = true;
                shootButton.hidden = true;
                alert("YOU FUCKIN' SUCK!");
            }
            else if (roundNum > 4){
                nextButton.hidden = true;
                shootButton.hidden = true;
                if (playerWins > pcWins){
                    alert("YOU WIN!");
                }
                else if (pcWins > playerWins){
                    alert("YOU FUCKIN' SUCK!");
                }
                else{
                    alert("Fuck you. You tied.");
                }
            }
        }
    }
});
    
function computerPlay() {
    let random = Math.floor(Math.random() * 3);

    let result = "whoops";
    switch (random) {
        case 0:
            result = "rock";
            break;
        case 1:
            result = "paper";
            break;
        case 2:
            result = "scissors";
            break;
    }

    return result;
}

function prepUserChoice(userCh) {
    let choiceLower = "";

    switch(userCh) {
        case 0:
            choiceLower = 'rock';
            break;
        case 1:
            choiceLower = 'paper';
            break;
        case 2:
            choiceLower = 'scissors';
    }
    
    return choiceLower;
}

function getResultText(userChoice, pcChoice, userWin) {
    let resultString = "Sum ting wong...";

    if (userWin) {
        playerWins++;
        resultString = "You win! " + setFrontCap(userChoice) + " beats " + pcChoice + "!";
    }
    else {
        pcWins++;
        resultString = "You lost! " + setFrontCap(pcChoice) + " beats " + userChoice + "!";
    }
    roundNum++;
    return resultString;
}

function setFrontCap(stringToCap){
    let frontChar = stringToCap.charAt(0);
    let restOfStr = stringToCap.slice(1, stringToCap.length);
    let frontCharCap = frontChar.toUpperCase();
    let restOfStrLow = restOfStr.toLowerCase();

    return frontCharCap + restOfStrLow;
}

function getWinner(user, pc) {
    user = prepUserChoice(user);

    let draw = (user == pc);
    if (draw){
        let resultString = "Draw! Both selected " + user + "!";
        roundNum++;
        return resultString;
    }

    let userWin;
    switch (user) {
        case "rock":
            userWin = (pc == "scissors");
            break;
        case "paper":
            userWin = (pc == "rock");
            break;
        case "scissors":
            userWin = (pc == "paper");
            break;
        default:
            shootButton.hidden = true;
            nextButton.hidden = false;
            alert("Something fucked up...");
            return;
    }

    return getResultText(user, pc, userWin);
}