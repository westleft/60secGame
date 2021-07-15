# JS地下城 - 60秒算數遊戲

<img src="https://img.shields.io/badge/JavaScript-exercise-yellow">　<img src="https://img.shields.io/badge/CSS-exercise-blue">

![](https://i.imgur.com/UgvhGQa.jpg)

## 產生隨機數
```js
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
```

## 隨機產生四種運算
```js
function calc(num1, num2, operatorNum) {
    switch (operatorNum) {
        case 1:
            return num1 + num2
            break
        case 2:
            return num1 - num2
            break
        case 3:
            return num1 * num2
            break
        case 4:
            return num1 / num2
            break
    }
}
```

連結：https://westleft.github.io/60secGame/
