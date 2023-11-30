//variables
let displayNum1 = '';
let displayNum2 = '';
let storeOperand = '';
let equalNum = 0;

//button varibles
let display = document.getElementById('display')
let pointBtn = document.querySelector('.point')
let clearBtn = document.querySelector('.ac')
let deleteBtn = document.querySelector('.dlt')
let equalBtn = document.querySelector('.equal')
let numBtn = document.querySelectorAll('.number')
let operandBtn = document.querySelectorAll('.operator')

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
clearBtn.addEventListener('click', () => {
    clearAll();
})
deleteBtn.addEventListener('click', () => {
    deleteNum()
});
equalBtn.addEventListener('click', () => {
    equalNum = operate(storeOperand, displayNum1, displayNum2);
    display.textContent = formatNumber(equalNum, 1e10);
})

function pushNum(number) {
    if (equalNum > 0) { 
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

function pushOperand(operator){
    storeOperand = operator
    console.log(storeOperand)
} 

function clearNum() {
    if (displayNum1) displayNum1 = '';
}

function clearOperand() {
    if (storeOperand) storeOperand = '';
}

function clearAll() {
    display.textContent = ''
    displayNum1 = '';
    displayNum2 = '';
    storeOperand = '';
    equalNum = 0;
}

function deleteNum() {
    if (displayNum1 && !storeOperand) {
        displayNum1 = displayNum1.slice(0, -1)
        display.textContent = display.textContent.slice(0, -1)
    } else if (storeOperand && displayNum2) {
        displayNum2 = displayNum2.slice(0, -1);
        display.textContent = display.textContent.slice(0, -1)
    };
}

function addOperand(a,b) {
    return parseInt(a) + parseInt(b);
}

function subtractOperand(a,b) {
    return parseInt(a) - parseInt(b)
};

function multiplyOperand(a,b) {
    return parseInt(a) * parseInt(b)
} 

function divideOperand(a,b) {
    return parseInt(a) / parseInt(b)
}

function operate(operand, a, b) {
    switch (operand) {
        case '+':
        return addOperand(a,b)
        break;
        case '-':
        return subtractOperand(a,b)
        break;
        case '÷':
        if (a == '0') return 0
        return divideOperand(a,b)
        break;
        case 'x':
        return multiplyOperand(a,b);
    }
}

function formatNumber(num, threshold) {
    if (Math.abs(num) >= threshold) {
        return num.toExponential(4);
    } else {
        return num.toString();
    }
};