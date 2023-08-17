let historicDisplay = document.querySelector('.displayHistoric');
let resultDisplay = document.querySelector('.displayResult');
let buttons = document.querySelectorAll('button');

let buttonSelected = '';
let firstNumber = '';
let operator = '';
let secondNumber = '';
let firstNum = '';
let secondNum = '';
let result = '';

function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
	return a * b;
};

function divide(a, b) {
	return a / b;
};

function operate(firstNum, operator, secondNum) {
	if (operator === '+') {
		return add(firstNum, secondNum);
	} else if (operator === '-') {
		return subtract(firstNum, secondNum);
	} else if (operator === '*') {
		return multiply(firstNum, secondNum);
	} else if (operator === '/') {
		return divide(firstNum, secondNum);
	};
};

buttons.forEach(button => {
	button.addEventListener('click', () => {
		buttonSelected = button.id;
		masterLogic(buttonSelected);
	});
});

function writeFirstNumber(buttonSelected) {
	firstNumber += buttonSelected;
	displayHistoric(firstNumber); 
	return firstNumber;
};

function writeOperator(buttonSelected) {
	operator = buttonSelected;
	displayHistoric(firstNumber + ' ' + operator); 
	return operator;
};

function writeSecondNumber(buttonSelected) {
	secondNumber += buttonSelected;
	displayHistoric(firstNumber + ' ' + operator + ' ' + secondNumber);
	return secondNumber;
};

function writeResult() {	
	result = operate(firstNumber, operator, secondNumber);
	displayResult(result);
	return result;
};

function isOperator(buttonSelected) {
	if (buttonSelected === '+' ||
		buttonSelected === '-' || 
		buttonSelected === '*' || 
		buttonSelected === '/') {
			return true;
		};
		return false;
};

function isEqual(buttonSelected) {
	if (buttonSelected === '=') {
		return true;
	};
	return false;
};

let isFirst = true; 
let isSecond = false; 

function masterLogic(buttonSelected) {
	if (isFirst && !isOperator(buttonSelected)) {
		firstNum = writeFirstNumber(buttonSelected);
		return firstNum;
	} else if (isFirst && isOperator(buttonSelected)) {
		op = writeOperator(buttonSelected);
		isFirst = false;
		isSecond = true;
		return op;
	} else if (isSecond && !isOperator(buttonSelected) && !isEqual(buttonSelected)) {
		secondNum = writeSecondNumber(buttonSelected);
		return secondNum;
	} else if (isSecond && !isOperator(buttonSelected) && isEqual(buttonSelected)) {
		result = writeResult();
	} else if (isSecond && isOperator(buttonSelected) && !isEqual(buttonSelected)) {
		result = writeResult();
		firstNumber = '';
		secondNumber = '';
		firstNumber = result;
		op = writeOperator(buttonSelected);
	}
};

let text = '';

function displayHistoric(string) {
	text = string;
	historicDisplay.textContent = text;
};

function displayResult(string) {
	text = string;
	resultDisplay.textContent = text;
};






