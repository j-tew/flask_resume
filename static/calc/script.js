// Save the stuff we need
const numbers = $('.numbers')
const operators = $('.operators')
const output = $('#output')
const value = 'data-value'
const maxChar = 13

// Establish some flags to control input and capture input
var firstNum = ''
var secondNum = ''
var currentOperator = ''
var acceptOperator = true
var acceptDecimal = true
var solved = false

// Wipe it all
const clear = () => {
    firstNum = ''
    secondNum = ''
    currentOperator = ''
    acceptOperator = true
    acceptDecimal = true
    solved = false
    output.text('0')
}

// The backspace should reset flags
const backspace = () => {
    // Last character
    let last = output.text().slice(-1)
    // Handling behavior
    if (output.text().length > 1) {
        // Allow a decimal after deletion
        if (last === '.') {
            output.text(function(i, old) {
                return old.slice(0, -1)
            })
            acceptDecimal = true
        }
        // Allow an operator after deletion
        else if (last.match(/(%|\*|\/|\+|-)/)) {
            output.text(function(i, old) {
                return old.slice(0, -1)
            })
            acceptOperator = true
        }
        // Just delete the last number
        else {
            output.text(function(i, old) {
                return old.slice(0, -1)
            })
        }
    }
    // Don't let the output be blank
    else {
        output.text('0')
    }
}

// Print the answer to the screen
const calculate = (solution) => {
    // But make sure it fits
    output.text(solution.toString().slice(0, maxChar))
    solved = true
}

// Checking for a solved state
const solutionCheck = () => {
    if (solved === true) {
        clear()
    }
}

// Clear Button
$('#clear').click(function() {
    clear()
    })

// Backspace Button
$('#backspace').click(function() {
    // If it's solved, just wipe it
    solutionCheck()
    backspace()
})

// Decimal Button
$('#decimal').click(function() {
    solutionCheck()
    // The literal string of a decimal
    let dec = $(this).attr(value)
    // The last character
    let last = output.text().slice(-1)
    // Can you legally put a decimal? (Math Police show no mercy!)
    if (acceptDecimal === true) {
        // Make sure we have a leading zero when we need one
        if (!(last.match(/\d/))) {
            // Add it to the screen*** (How many times do I use this function?)
            output.text(function(i, old) {
                return old + '0' + dec
            })
            acceptDecimal = false
        }
        // When we don't need it
        else {
            // Two times***
            output.text(function(i, old) {
                return old + dec
            })
            acceptDecimal = false
        }
    }
})

// Equals Button
$('#equals').click(function() {
    // Careful not to hit 'equals' twice or it will clear your results
    solutionCheck()
    // You want the solution, but are you ready?
    if (acceptOperator === false && solved === false) {
        // Capture that second number (we capture the first when we hit the operator button)
        secondNum = output.text().split(currentOperator)[1]
        // Do calculator things
        switch (currentOperator) {
            case '+':
                calculate(parseFloat(firstNum) + parseFloat(secondNum))
                break;
            case '-':
                calculate(parseFloat(firstNum) - parseFloat(secondNum))
                break;
            case '/':
                calculate(parseFloat(firstNum) / parseFloat(secondNum))
                break;
            case '*':
                calculate(parseFloat(firstNum) * parseFloat(secondNum))
                break;
            case '%':
                calculate(parseFloat(firstNum) % parseFloat(secondNum))
            break;
        }
    }
})

// Number Buttons
numbers.click(function() {
    // Reset
    solutionCheck()
    // Literal string of the number
    let num = $(this).attr(value)
    // Don't overflow the screen
    if (output.text().length < maxChar) {
        // Replace zero
        if (output.text() === '0') {
            output.text(num)
        }
        // Just put the number up there
        else {
            // Three times***
            output.text(function(i, old) {
                return old + num
            })
        }
    }
})

// Operator Buttons
operators.click(function() {
    // Checking that last character again (it's super important)
    let last = output.text().slice(-1)
    if (last === '.') {
        // Four times***
        output.text(function(i, old) {
            // Another leading zero
            return old + '0'
        })
    }
    // Save the Operator
    currentOperator = $(this).attr(value)
    // Is the mood right?
    if (acceptOperator === true && solved === false) {
        // Five times***
        output.text(function(i, old) {
            // Go ahead and grab that first number (put it in your pocket)
            firstNum = old
            return old + currentOperator
        })
        // One operation at a time please
        acceptOperator = false
        // You are allowed to put a 
        acceptDecimal = true
    }
    // You should be able to continue operating on the solution
    else if (acceptOperator == false && solved === true) {
        // Yeah, we can because 'Merica!
        acceptOperator = true
        // Start a new problem
        solved = false
        // Six times*** (should've made it a function)
        output.text(function(i, old) {
            // Oh, and the solution now goes in your pocket
            firstNum = old
            return old + currentOperator
        })
        // Make ready for the equals button again
        acceptOperator = false
        acceptDecimal = true
    }
})