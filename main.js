const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;
  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const type = key.dataset.type;
  const selected = document.querySelector('[data-state="selected"');
  const { previousKeyType } = calculator.dataset;
  //Is this a number key?
  if (type === "number") {
    if (displayValue === "0") {
      display.textContent = keyValue;
    } else if (previousKeyType === "operator") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  // Is this an operator key?

  if (type === "operator") {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"');
    operatorKeys.forEach((el) => (el.dataset.state = ""));
    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    //Perform calculation

    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    if (!secondNumber || !operator || !firstNumber) return;
    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  if (type === "clear") {
    // Clear calculator
    display.textContent = "0";
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
    delete selected.dataset.state;
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);

  if (operator === "plus") return firstNumber + secondNumber;
  if (operator === "minus") return firstNumber - secondNumber;
  if (operator === "times") return firstNumber * secondNumber;
  if (operator === "divide") return firstNumber / secondNumber;
}
