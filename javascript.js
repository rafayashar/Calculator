function add() {
    let addition = 0;
    for (let i = 0; i < arguments.length; i++) {
        addition = addition + arguments[i];
    }
    return addition;
}

function subtract() {
    let i = 0;
    let subtraction = arguments[i];
    for (i = 1; i < arguments.length; i++) {
        subtraction = subtraction - arguments[i];
    }
    return subtraction;
}

function multiply() {
    let multiply = 1;
    for (let i = 0; i < arguments.length; i++) {
        multiply = multiply * arguments[i];
    }
    return multiply;
}

function divide() {
    let i = 0;
    let divide = arguments[i];
    for (i = 1; i < arguments.length; i++) {
        divide = divide / arguments[i];
    }
    return divide;
}

function operate(arithmetic, num1, num2) {
    switch (String(arithmetic)) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case 'x':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        default:
           alert('Wrong Input! Check your arithmetic sign.');
    }
}
let numRound = 0;
let opRound = 0;
let num = [];
let operator = [];
let answer;
let previousOpRound = -1;

const container = document.querySelector('#container');

const screen = document.createElement('div');
screen.classList.add('screen');
screen.textContent = '0';

const pad = document.createElement('div');
pad.classList.add('pad');

const numericPad = document.createElement('div');
numericPad.classList.add('numericPad');

const equals = document.createElement('div');
equals.textContent = '=';
equals.classList.add('equals');
equals.style.order = 10;
numericPad.appendChild(equals);

const point = document.createElement('div');
point.textContent = '.';
point.classList.add('point');
point.classList.add('numericKey');
point.style.order =10;
numericPad.appendChild(point);

for (let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    div.classList.add('numericKey');
    div.textContent = i;
    div.style.order = 10 - i;
    numericPad.appendChild(div);
}

const arithmeticPad = document.createElement('div');
arithmeticPad.classList.add('arithmeticPad');

for (let i = 0; i < 4; i++) {
    const div = document.createElement('div');
    div.classList.add('arithmeticKey');
    div.style.order = 4 - i;
    arithmeticPad.appendChild(div);
}

const erase = document.createElement('div');
erase.classList.add('erase');
erase.textContent = 'A/C';
erase.style.order = 0;
arithmeticPad.appendChild(erase);

arithmeticPad.childNodes[0].textContent = '+';
arithmeticPad.childNodes[1].textContent = '-';
arithmeticPad.childNodes[2].textContent = 'x';
arithmeticPad.childNodes[3].textContent = '/';

container.appendChild(screen);
container.appendChild(pad);
pad.appendChild(numericPad);
pad.appendChild(arithmeticPad);

let count = [];

erase.addEventListener('click', () => {
    screen.textContent = '0';
    answer = 0;
    num = [];
    num[0] = '';
    operator = [];
    numRound = 0;
    opRound = 0;
    previousOpRound = -1;
    count = [];
});

num[0] = ''
count[0] = 0;
const keys = document.querySelectorAll('.numericKey');

keys.forEach((key) => {
    key.addEventListener('click', function (e) {

        e.target.classList.add('animation');

        if (previousOpRound <= opRound) {
            num[numRound] = num[numRound] + e.target.textContent;
        };

        if (num[numRound] == '0' && operator[numRound - 1] == '/') {
            alert('YOU CAN NOT DIVIDE BY ZERO! THAT\'S CRAZY! Just....try again.');
            num[numRound] = '';
        }
        else if (count[numRound] > 1) {
                alert(`WHAT KIND OF NUMBER IS ${num[numRound]}! Try again..`);
                num[numRound] = '';
                count[numRound] = 0;
                screen.textContent = num[numRound-1];
        }
        else {
            screen.textContent = num[numRound];
        }

        if (e.target.textContent == '.') {
            count[numRound] = count[numRound] + 1;
        }
    });
});

function removeTransition() {
    this.classList.remove('animation');
}

const transArith = document.querySelectorAll('.arithmeticKey');
transArith.forEach(tranArith => tranArith.addEventListener('transitionend', removeTransition));

const transNum = document.querySelectorAll('.numericKey');
transNum.forEach(tranNum => tranNum.addEventListener('transitionend', removeTransition));

const operation = document.querySelectorAll('.arithmeticKey');
operation.forEach((sign) => {
    sign.addEventListener('click', function (e) {

        e.target.classList.add('animation');
        operator[opRound] = e.target.textContent;
        opRound++;
        previousOpRound++;
        numRound = opRound;
        num[numRound] = '';
        count[numRound] = 0;
    });
});


equals.addEventListener('click', () => {

    answer = num[0];
    for (let i = 0; i < operator.length; i++) {
        answer = operate(String(operator[i]), parseFloat(answer), parseFloat(num[i+1]));
        screen.textContent = Math.round((answer + Number.EPSILON) * 100) / 100;
    };

    i = 0;
});