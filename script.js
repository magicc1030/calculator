const display = document.querySelector(".display");
let currentNumber = display.textContent;
const numbers = document.querySelectorAll(".number");
let firstNumber, operator;
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");

equal.addEventListener("click", () => {
  const result = operate(operator, Number(firstNumber), Number(currentNumber));
  firstNumber = String(result);
  display.textContent = firstNumber;
  console.log(firstNumber, operator, currentNumber, " ini hasil")
});

operators.forEach((item) => {
  item.addEventListener("click", () => {
    firstNumber = currentNumber;
    operator = item.dataset.operator;
    currentNumber = "";
  });
});

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (currentNumber === "0") {
      currentNumber = number.textContent;
      display.textContent = currentNumber;
    } else {
      currentNumber += number.textContent;
      display.textContent = currentNumber;
    }
    console.log(firstNumber, operator, currentNumber);
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
    return divide(firstNumber, secondNumber);
  }
}
