let number1 = document.querySelector('.number1')
let number2 = document.querySelector('.number2')
let operator = document.querySelector('.operator')
let scoreText = document.querySelector('.scoreText')
let secondsTime = document.querySelector('.secondsTime')
let finalScore = document.querySelector('.finalScore')

let input = document.querySelector("input")

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 隨機產生四種運算
function calc(num1, num2, operatorNum) {
    switch (operatorNum) {
        case 1:
            operator.textContent = '+'
            return parseInt(num1) + parseInt(num2)
            break
        case 2:
            operator.textContent = '-'
            return num1 - num2
            break
        case 3:
            operator.textContent = '×'
            return num1 * num2
            break
        case 4:
            operator.textContent = '÷'
            return num1 / num2
            break
    }
}

let result

input.addEventListener('keyup', function (event) {
    //按下enter後
    if (event.keyCode == 13) {
        checkAnswer()
        setQuestion()
        result = calc(number1.textContent, number2.textContent, getRandom(1, 4))
    }
})

//檢查答案是否正確，正確就加分
function checkAnswer() {
    let parseNum = parseInt(scoreText.textContent)
    if (input.value == result) {
        addPoint(secondsTime.textContent,parseNum)
    } else {
        //0分不倒扣
        if (parseNum === 0) {
            return
        }
        scoreText.textContent = padding((parseNum -= 1), 3)
    }
}

// 重設問題
function setQuestion() {
    if (secondsTime.textContent >= 40 && secondsTime.textContent <= 60) {
        number1.textContent = getRandom(1, 9)
        number2.textContent = getRandom(1, 9)
    } else if (secondsTime.textContent >= 20 && secondsTime.textContent < 40) {
        number1.textContent = getRandom(10, 99)
        number2.textContent = getRandom(10, 99)
    } else {
        number1.textContent = getRandom(1, 9)
        number2.textContent = getRandom(1, 9)
    }
    input.value = ''
}


//開始遊戲
function start() {
    let timer = setInterval(function () {
        secondsTime.textContent -= 1
        if (secondsTime.textContent < 10) {
            secondsTime.textContent = padding(secondsTime.textContent, 2)
        }
        if (secondsTime.textContent == 0) {
            clearInterval(timer)
            finalScore.textContent = scoreText.textContent
            document.querySelector('.playGame').style.display = 'none'
            document.querySelector('.endGame').style.display = 'flex'
        }
    }, 1000)
}

// 增加00
function padding(num, length) {
    if ((num + "").length >= length) {
        return num;
    }
    return padding("0" + num, length)
}

//判斷秒數(加分)
function addPoint(sec,parseNum){
    sec = parseInt(sec)
    if(sec >=40 && sec <= 60){
        scoreText.textContent = padding((parseNum += 1), 3)
    }else{
        scoreText.textContent = padding((parseNum += 5), 3)
    }
}


let startButton = document.querySelector('.startButton')
let tryBtn = document.querySelector('.tryBtn')

//遊戲開始按鈕
startButton.addEventListener('click',function(){
    document.querySelector('.startGame').style.display = 'none'
    document.querySelector('.playGame').style.display = 'flex'
    start()
})

//再玩一次
tryBtn.addEventListener('click',function(){
    document.querySelector('.playGame').style.display = 'flex'
    document.querySelector('.endGame').style.display = 'none'
    secondsTime.textContent = '60'
    scoreText.textContent = '000'
    start()
})