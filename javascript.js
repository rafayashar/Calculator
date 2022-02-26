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
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        default:
           alert('Wrong Input! Check your arithmetic sign.');
    }
}

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
equals.classList.add('numericKey');
equals.style.order = 10;
numericPad.appendChild(equals);

const point = document.createElement('div');
point.textContent = '.';
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

for (let i = 0; i < 5; i++) {
    const div = document.createElement('div');
    div.classList.add('arithmeticKey');
    div.style.order = 5 - i;
    arithmeticPad.appendChild(div);
}
arithmeticPad.childNodes[0].textContent = '+';
arithmeticPad.childNodes[1].textContent = '-';
arithmeticPad.childNodes[2].textContent = 'x';
arithmeticPad.childNodes[3].textContent = '/';
arithmeticPad.childNodes[4].textContent = 'A/C';

const plus = arithmeticPad.childNodes[0];
const minus = arithmeticPad.childNodes[1];
const mult = arithmeticPad.childNodes[2];
const divi = arithmeticPad.childNodes[3];
const erase = arithmeticPad.childNodes[4];

container.appendChild(screen);
container.appendChild(pad);
pad.appendChild(numericPad);
pad.appendChild(arithmeticPad);

erase.addEventListener('click', () => {
    screen.textContent = '1';
    calcRound = 1;
    answer = 0;
});

plus.addEventListener('click', add);
minus.addEventListener('click', subtract);
mult.addEventListener('click', multiply);
divi.addEventListener('click', divide);

const keys = document.querySelectorAll('.numericPad');
let num = [];
let operator;
let calcRound = 1;
keys.addEventListener('click', function (e) {
    for(let i = calcRound; i <= 3; i++) {
        num[i] = e.target.textContent;

        if (i == 3) {
            i = 2;
        };

        num[1] = answer;
    };
});

equals.addEventListener('click', () => {
    operate(num[2], num[1], num[3]);
});