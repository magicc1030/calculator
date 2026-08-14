const display = document.querySelector(".display");
let currentNumber = display.textContent;
const numbers = document.querySelectorAll(".number");
let firstNumber, operator;
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
let justCalculated = false;
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const backspace = document.querySelector(".backspace");

document.addEventListener("keydown", (event) => {
  if ("0123456789".includes(event.key)) {
    inputNumber(event.key);
  } else if ("+-*/".includes(event.key)) {
    inputOperator(event.key);
  } else if (event.key === "Enter") {
    inputEqual();
  } else if (event.key === ".") {
    inputDecimal();
  } else if (event.key === "Backspace") {
    inputBackspace();
  } else if (event.key === "Escape") {
    clearCalculator();
  }
});

function inputBackspace() {
  if (justCalculated) {
    justCalculated = false;
    currentNumber = "0";
    display.textContent = currentNumber;
  } else if (currentNumber !== "0") {
    if (currentNumber.length === 1) {
      currentNumber = "0";
    } else {
      currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    }
    display.textContent = currentNumber;
  }
}
backspace.addEventListener("click", inputBackspace);

function inputDecimal() {
  if (justCalculated) {
    justCalculated = false;
    currentNumber = "0.";
    display.textContent = currentNumber;
  } else if (!currentNumber.includes(".")) {
    currentNumber += ".";
    display.textContent = currentNumber;
  }
}
decimal.addEventListener("click", inputDecimal);

clear.addEventListener("click", clearCalculator);

function clearCalculator() {
  currentNumber = "0";
  display.textContent = currentNumber;
  firstNumber = undefined;
  operator = undefined;
  justCalculated = false;
}

function calculate() {
  const result = operate(operator, Number(firstNumber), Number(currentNumber));
  if (result === "ERROR") {
    firstNumber = undefined;
    operator = undefined;
    currentNumber = "0";
    display.textContent = "NaN";
    return;
  }
  currentNumber = String(result);
  firstNumber = undefined;
  operator = undefined;
  display.textContent = currentNumber;
}

function inputEqual() {
  if (
    firstNumber !== undefined &&
    currentNumber !== "" &&
    operator !== undefined
  ) {
    calculate();
    justCalculated = true;
  }
}
equal.addEventListener("click", inputEqual);

function inputOperator(operatorInput) {
  if (firstNumber !== undefined && currentNumber !== "") {
    calculate();
  }
  if (currentNumber !== "") {
    firstNumber = currentNumber;
  }
  operator = operatorInput;
  currentNumber = "0";
  justCalculated = false;
}
operators.forEach((item) => {
  item.addEventListener("click", () => {
    inputOperator(item.dataset.operator);
  });
});

function inputNumber(number) {
  if (justCalculated) {
    currentNumber = number;
    display.textContent = currentNumber;
  } else if (currentNumber === "0") {
    currentNumber = number;
    display.textContent = currentNumber;
  } else {
    currentNumber += number;
    display.textContent = currentNumber;
  }
  justCalculated = false;
}
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    inputNumber(number.textContent);
  });
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, firstNumber, secondNumber) {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  } else if (operator === "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operator === "*") {
    return multiply(firstNumber, secondNumber);
  } else if (operator === "/") {
    if (secondNumber === 0) {
      return "ERROR";
    }
    return divide(firstNumber, secondNumber);
  }
}
