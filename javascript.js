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
let text = '';
let isFirst = true; 
let isSecond = false;
let isDivByZero = false;

function add(a, b) {
	return (Math.round((+a + +b) * 100) / 100).toString();
};

function subtract(a, b) {
	return (Math.round((+a - +b) * 100) / 100).toString();
};

function multiply(a, b) {
	return (Math.round((+a * +b) * 100) / 100).toString();
};

function divide(a, b) {
	return (Math.round((+a / +b) * 100) / 100).toString();
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
		if (buttonSelected === 'clear' || isDivByZero) {
			clearAll();
		} else {
			masterLogic(buttonSelected);
		}
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

function clearAll() {
	buttonSelected = '';
	firstNumber = '';
	operator = '';
	secondNumber = '';
	firstNum = '';
	secondNum = '';
	result = '';
	isFirst = true; 
	isSecond = false;
	isDivByZero = false;
	displayHistoric('');
	displayResult('');
};

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
		if (secondNum === '0') {
			divByZeroHandler();
		} else {
			result = writeResult();
		}
	} else if (isSecond && isOperator(buttonSelected) && !isEqual(buttonSelected)) {
		if (secondNum === '0') {
			divByZeroHandler();
		} else {
			result = writeResult();
			firstNumber = '';
			secondNumber = '';
			firstNumber = result;
			op = writeOperator(buttonSelected);
		}
	}
};

function displayHistoric(string) {
	text = string;
	historicDisplay.textContent = text;
};

function displayResult(string) {
	text = string;
	resultDisplay.textContent = text;
};

function divByZeroHandler() {
	displayResult('Can\'t do division by 0!');
	isDivByZero = true;
};




