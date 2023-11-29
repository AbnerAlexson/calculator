//variables
let displayNum1 = '';
let displayNum2 = '';
let storeOperand = '';

//button varibles
let display = document.getElementById('display')
let pointBtn = document.querySelector('.point')
let clearBtn = document.querySelector('.ac')
let deleteBtn = document.querySelector('.dlt')
let equalBtn = document.querySelector('.equal')
let numBtn = document.querySelectorAll('.number')
let operandBtn = document.querySelectorAll('.operator')

numBtn.forEach(numbers => {
    numbers.addEventListener('click', () => pushNum(numbers.textContent))
});
operandBtn.forEach(operators =>{
    operators.addEventListener('click', () => pushOperand(operators.textContent))
})
clearBtn.addEventListener('click', () => {
    clearDisplay();
    displayNum1 = '';
    displayNum2 = '';
    storeOperand = '';
})
deleteBtn.addEventListener('click', () => {

})


function pushNum(number) {
    if (!displayNum1 && !storeOperand) {
        displayNum1 += number
        display.textContent += number
    } else if(displayNum1 && !storeOperand) {
        displayNum1 += number
        display.textContent += number
    } else if (!displayNum1 && storeOperand) {
        displayNum1 = '0';
        displayNum2 += number
        display.textContent += number
    } else if (displayNum1 && storeOperand && !displayNum2) {
        clearDisplay()
        displayNum2 += number
        display.textContent += number
    } else {
        displayNum2 += number
        display.textContent += number
    };
};

function pushOperand(operator){
    storeOperand = operator
} 

function clearNum() {
    if (displayNum1) displayNum1 = '';
}

function clearOperand() {
    if (storeOperand) storeOperand = '';
}

function clearDisplay() {
    display.textContent = ''
}

function deleteNum() {
    display.textContent = display.textContent.slice(0, -1)
    if(displayNum1 && !storeOperand) {
        displayNum1 = displayNum1.slice(0, -1)
    } else if {
        
    }
}

function addOperand(a,b) {
    return a + b
}  

function subtractOperand(a,b) {
    return a - b
} 

function multiplyOperand(a,b) {
    return a * b
} 

function divideOperand(a,b) {
    return a / b
}

//function operate(operator, a, b) {
  //  a = Number(a)
 //   b = Number(b)
 ///   switch (operator)
//}