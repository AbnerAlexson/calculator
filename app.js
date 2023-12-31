//variables that holds values
let displayNum1 = '';
let displayNum2 = '';
let storeOperand = '';
let equalNum = 0;
let transferNum = 0;

//button varibles
let display = document.getElementById('display')
let pointBtn = document.querySelector('.point')
let clearBtn = document.querySelector('.ac')
let deleteBtn = document.querySelector('.dlt')
let equalBtn = document.querySelector('.equal')
let numBtn = document.querySelectorAll('.number')
let operandBtn = document.querySelectorAll('.operator')

//event listeners
numBtn.forEach(numbers => {
    numbers.addEventListener('click', () => {
        if (display.textContent.length != 10 && !storeOperand) display.textContent += numbers.textContent
        if (storeOperand && !displayNum2) {
            display.textContent = '';
            display.textContent += numbers.textContent
        } else if (display.textContent.length != 10 && storeOperand) {
            display.textContent += numbers.textContent
        }
        pushNum(numbers.textContent)
    });
})
operandBtn.forEach(operators =>{
    operators.addEventListener('click', () => pushOperand(operators.textContent))
})
pointBtn.addEventListener('click', () => {
    pushPoint()
})

clearBtn.addEventListener('click', () => {
    clearAll();
})
deleteBtn.addEventListener('click', () => {
    deleteNum();
});
equalBtn.addEventListener('click', () => {
    equal();
})

// function outputs numbers
function pushNum(number) {
    if (storeOperand == '' && equalNum >= 1) { 
        clearAll() 
        displayNum1 += number
        display.textContent += number
    } else if (displayNum1.length != 10 && !storeOperand && !displayNum2) {
        displayNum1 += number
    }
    if (storeOperand && !displayNum2 && !displayNum1) {
        displayNum1 = '0'
        displayNum2 += number
    } else if(displayNum2.length != 10 && storeOperand) {
        displayNum2 += number;
    };
    console.log(displayNum1)
    console.log(displayNum2)
}

//function that outputs the calculator's operation
function pushOperand(operator){
    if (!storeOperand && displayNum1) {
        storeOperand = operator
    } else if (displayNum1 && storeOperand && !displayNum2) {
        storeOperand = operator
    } else if (displayNum2) {
        equal();
        storeOperand = operator
    }
    console.log(storeOperand)
} 

//function that output decimal point
function pushPoint() {
    if (displayNum1 && displayNum1.indexOf('.') == -1 && !storeOperand && !displayNum2) {
        displayNum1 += '.'
        display.textContent += '.'
    } else if (displayNum2 && displayNum2.indexOf('.') == -1 && storeOperand) {
        displayNum2 += '.'
        display.textContent += '.'
    }
}

//function that calculates the numbers
function equal() {
    equalNum = operate(storeOperand, displayNum1, displayNum2);
    if (countDigits(equalNum) >= 6) {
        transferNum = Number(equalNum.toFixed(0))
    } else if (countDigits(equalNum) < 6) {
        transferNum = Number(equalNum.toFixed(4))
    }
    display.textContent = formatNumber(transferNum, 1e9);
    displayNum1 = display.textContent.toString();
    storeOperand = ''
    displayNum2 = ''
}

//function that clears everything
function clearAll() {
    display.textContent = ''
    displayNum1 = '';
    displayNum2 = '';
    storeOperand = '';
    equalNum = 0;
}

//functions that delete numbers 
function deleteNum() {
    if (displayNum1 && !storeOperand) {
        displayNum1 = displayNum1.slice(0, -1)
        display.textContent = displayNum1
    } else if (storeOperand && displayNum2) {
        displayNum2 = displayNum2.slice(0, -1);
        display.textContent = displayNum2
    };
}

//function that used for counting calculated number figures 
function countDigits(number) {
    // Handle the case for zero separately
    if (number === 0) {
        return 1;
    }

    // Take the absolute value of the number
    let num = Math.abs(number);

    let count = 0;

    // Count the digits using a loop
    while (num >= 1) {
        num /= 10;
        count++;
    }

    return count;
}

//calculator operation
function addOperand(a,b) {
    if (b == null || b == '') {
        b = a;
        return parseFloat(a) + parseFloat(b);
    } else {
        return parseFloat(a) + parseFloat(b);
    }
}

function subtractOperand(a,b) {
    if (b == null || b == '') {
        b = a;
        return parseFloat(a) - parseFloat(b);
    } else {
        return parseFloat(a) - parseFloat(b);
    }
}

function multiplyOperand(a,b) {
    if (b == null || b == '') {
        b = a;
        return parseFloat(a) * parseFloat(b);
    } else {
        return parseFloat(a) * parseFloat(b);
    }
}

function divideOperand(a,b) {
    if (b == null || b == '') {
        b = a;
        return parseFloat(a) / parseFloat(b);
    } else {
        return parseFloat(a) / parseFloat(b);
    }
}

function operate(operand, a, b) {
    if (operand == '' && b == '')  return;
    switch (operand) {
        case '+':
        return addOperand(a,b)
        break;
        case '-':
        return subtractOperand(a,b)
        break;
        case '÷':
        return divideOperand(a,b)
        break;
        case 'x':
        return multiplyOperand(a,b);
    }
}

//function that is used to reduce the figure of calculated numbers so that it does not overflow the display
function formatNumber(num, threshold) {
    if (num >= threshold) {
        return num.toExponential(4);
    } else {
        return num.toString();
    }
};