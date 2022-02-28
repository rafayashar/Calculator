// FUNCTION TO ADD NUMBERS
function add() {
    let addition = 0;
    for (let i = 0; i < arguments.length; i++) {
        addition = addition + arguments[i];
    }
    return addition;
}

//FUNCTION TO SUBTRACT NUMBERS
function subtract() {
    let i = 0;
    let subtraction = arguments[i];
    for (i = 1; i < arguments.length; i++) {
        subtraction = subtraction - arguments[i];
    }
    return subtraction;
}

// FUNCTION TO MULTIPLY NUMBERS
function multiply() {
    let multiply = 1;
    for (let i = 0; i < arguments.length; i++) {
        multiply = multiply * arguments[i];
    }
    return multiply;
}

// FUNCTION TO DIVIDE NUMBERS
function divide() {
    let i = 0;
    let divide = arguments[i];
    for (i = 1; i < arguments.length; i++) {
        divide = divide / arguments[i];
    }
    return divide;
}

// FUNCION THAT TAKES IN AN ARITHMETIC SIGN ('+', '-', 'x', '/') IN STING FORMAT, AS WELL AS TWO NUMBERS, AND THEN CALLS THE APPROPIATE
// FUNCTION (ADD(), SUBTRACT(), MULTIPLY(), DIVIDE()). THEN RETURNS THE RESULT.
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

// INITIALIZING AND DECLARING SOME VARIABLES USED IN LATER ITERATIONS
let numRound = 0;
let opRound = 0;
let num = [];
let operator = [];
let answer;
let previousOpRound = -1;

// SELECTING MAIN DIV INSIDE THE BODY THAT WILL CONTAIN THE CALCULATOR
const container = document.querySelector('#container');

// ADDING A DIV TO THE CONTAINER TO REPRESENT THE SCREEN WHERE THE ANSWER WILL BE DISPLAYED
const screen = document.createElement('div');
screen.classList.add('screen');
screen.textContent = '0';

// ADDING A DIV WHICH WILL REPRESENT THE KEY PAD PORTION OF THE CALCULATOR. THE KEY PAD WILL BE DIVIDED IN TO TWO MAIN SECTIONS.
// ONE WILL BE THE NUMERIC PAD, WHICH ARE NUMBERS FROM 0 - 9. THE OTHER WILL BE THE ARITHMETIC PAD, WHICH ARE ARITHMETIC SIGNS.
// ADITIONAL KEYS IN THE PAD INCLUDE EQUALS SIGN, DOT FOR POINT, CLEAR BUTTON ETC.
const pad = document.createElement('div');
pad.classList.add('pad');

// CREATING AND ATTACHING THE NUMERIC PAD TO THE PAD DIV
const numericPad = document.createElement('div');
numericPad.classList.add('numericPad');

// CREATING AND ATTACHING THE EQUALS BUTTON TO THE NUMERIC PAD
const equals = document.createElement('div');
equals.textContent = '=';
equals.classList.add('equals');
equals.style.order = 10;
numericPad.appendChild(equals);

// CREATING AND ATTACHING THE POINT BUTON TO THE NUMERIC PAD
const point = document.createElement('div');
point.textContent = '.';
point.classList.add('point');
point.classList.add('numericKey');
point.style.order =10;
numericPad.appendChild(point);

// CREATING BUTTONS 0 - 9 AND ATTACHING TO THE NUMERIC PAD
for (let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    div.classList.add('numericKey');
    div.textContent = i;
    div.style.order = 10 - i;
    numericPad.appendChild(div);
}

const arithmeticPad = document.createElement('div');
arithmeticPad.classList.add('arithmeticPad');

// CREATING BUTTONS FOR ARITHMETIC SIGNS AND ATTACHING TO THE ARITHMETIC PAD
for (let i = 0; i < 4; i++) {
    const div = document.createElement('div');
    div.classList.add('arithmeticKey');
    div.style.order = 4 - i;
    arithmeticPad.appendChild(div);
}

// CREATING THE ERASE BUTTON AND ATTACHING TO THE ARITHMETIC PAD
const erase = document.createElement('div');
erase.classList.add('erase');
erase.textContent = 'A/C';
erase.style.order = 0;
arithmeticPad.appendChild(erase);

arithmeticPad.childNodes[0].textContent = '+';
arithmeticPad.childNodes[1].textContent = '-';
arithmeticPad.childNodes[2].textContent = 'x';
arithmeticPad.childNodes[3].textContent = '/';

// ATTACHING THE NUMERIC PAD AND ARITHMETIC PAD TO THE PAD DIV, AND THE PAD DIV AND SCREEN DIV TO THE MAIN CONTAINER DIV
container.appendChild(screen);
container.appendChild(pad);
pad.appendChild(numericPad);
pad.appendChild(arithmeticPad);

// INITIALIZING COUNT VARIABLE WHICH WILL DETERMINE HOW MANY TIMES POINT (DOT) HAS BEEN USED PER NUMBER INPUT
let count = [];

// ADDING EVNT LISTENER TO ERASE BUTTON WHICH WILL CLEAR ALL VARIABLES USED IN A CALCULATIONS, INCLUDING ALL COUNTERS, ANSWER, SCREEN DISPLAY ETC.
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

// INITIALIZING NUMB ARAY WHICH WILL HOLD NUMBER INPUTS AND COUNT ARRAY WHICH WILL HOLD HOW MANY TIMES POINT (DOT) HAS BEEN USED
num[0] = ''
count[0] = 0;
const keys = document.querySelectorAll('.numericKey');


// EVENT LISTENER TO LISTEN FOR WHICH NUMBER KEY HAS BEEN PRESSED. ALSO CHECKS IF USER IS DIVIDING BY ZERO AND GIVES AN ERROR MESSAGE IF TRUE.
// ALSO CHECKS IF USER HAS USED TWO DECIMAL POINTS IN A NUMBER (X.Y.Z) AND GIVES AN ERROR MESSAGE IF TRUE. ALSO ADDS ANIMATION FOR WHEN A KEY
// IS PRESSED.
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

// REMOVE ANIMATION CLASS WHEN ANIMATION IS COMPLETE. 
const transArith = document.querySelectorAll('.arithmeticKey');
transArith.forEach(tranArith => tranArith.addEventListener('transitionend', removeTransition));

const transNum = document.querySelectorAll('.numericKey');
transNum.forEach(tranNum => tranNum.addEventListener('transitionend', removeTransition));

// EVENT LISTENER TO LISTEN FOR WHICH ARITHMETIC SIGN IS PRESSED AND HOLD IT IN AN ARRAY.
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

// LISTEN FOR WHEN EQUALS KEY IS PRESSED AND PASS THE NUMBERS AND ARITHMETIC SIGN TO THE OPERATE FUNCTION AND DISPLAT RESULT
equals.addEventListener('click', () => {

    answer = num[0];
    for (let i = 0; i < operator.length; i++) {
        answer = operate(String(operator[i]), parseFloat(answer), parseFloat(num[i+1]));
        screen.textContent = Math.round((answer + Number.EPSILON) * 100) / 100;
    };

    i = 0;
});