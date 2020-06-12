"use strict"

// array of keys
var keys = document.getElementsByClassName("key")

// display variable
var display = document.getElementById("display")

// numbers and keys for values
var operand1 = 0
var operand2 = null
var operator = null
var keycode = null

// function to check if the value entered is an operator
function checkOperator(value) {
  return value == "+" || value == "-" || value == "/" || value == "*"
}

// handle keypress to enter values in calculator
document.addEventListener("keydown", function (event) {
  keycode = event.keyCode
  console.log("key down " + keycode)
  if (keycode >= 48 && keycode <= 57) {
    display.innerText += keycode - 48
  } else if (keycode >= 96 && keycode <= 105) {
    display.innerText += keycode - 96
  } else if (keycode == 8) {
    display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 1
    )
  }
})

// for loop for iterating over each click event that occurs on a key
for (var i = 0; i < keys.length; i++) {
  // adding event listener
  keys[i].addEventListener("click", function () {
    //   storing value through getAttribute
    var value = this.getAttribute("data-value")

    //  checking operator or operands entered
    if (checkOperator(value)) {
      operator = value
      operand1 = parseFloat(display.textContent)
      display.innerText = ""
    } else if (value == "=") {
      operand2 = parseFloat(display.textContent)
      var result = eval(operand1 + " " + operator + " " + operand2)
      if (!Number.isInteger(result)) {
        result = result.toPrecision(4)
      }
      if (result) {
        display.textContent = result
        operand1 = result
        operand2 = null
        operator = null
      }
    } else if (value == ".") {
      if (display.textContent.length && !display.textContent.includes(".")) {
        display.textContent += "."
      }
    } else if (value == "%") {
      operand1 = parseFloat(display.textContent)
      operand1 = operand1 / 100
      display.textContent = operand1
    } else if (value == "AC") {
      display.innerText = ""
    } else if (value == "back") {
      display.textContent = display.textContent.slice(
        0,
        display.textContent.length - 1
      )
    } else {
      display.innerText += value
    }
  })
}
