let buffer = "0";
let previousOperator = '';
let previousNum = '';
let justCalculated = false;
let inputingNewNumber = false;
const display = document.querySelector('.display');

document
    .querySelector(".calculator")
    .addEventListener('click', function(event){
        if(event.target.tagName === 'BUTTON'){
            buttonClick(event.target.innerText);
        }
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
}

function handleNumber(value) {
    if(buffer === "0"){
        buffer = value;
    }else if(justCalculated){
        buffer = value;
        justCalculated = false;
        if(inputingNewNumber === true){
            inputingNewNumber = false;
        }
    }else if(previousNum != '' && inputingNewNumber){
        buffer = value;
        inputingNewNumber = false;
    }else{
        buffer += value;
    }
    redisplay();
}

function handleSymbol(value) {
    if(value === "C"){
        buffer = "0";
        previousNum = '';
        previousOperator = '';
        justCalculated = false;
        inputingNewNumber = false;
    }else if(value === '='){
        calculate()
    }else if(value === "←"){
        console.log(buffer);
        buffer = buffer.substring(0, (buffer.length - 1));
        console.log(buffer);
    }else{
        previousOperator = value;
        previousNum = buffer;
        inputingNewNumber = true;
    }
    redisplay();
}

function calculate(){
    if((previousOperator !== '') && (previousNum !== '')){
        tempBuffer = parseFloat(buffer);
        tempNum = parseFloat(previousNum);
        if(previousOperator === "+"){
            tempNum += tempBuffer;
        }else if(previousOperator === "-"){
            tempNum -= tempBuffer;
        }else if(previousOperator === "×"){
            tempNum *= tempBuffer;
        }else if(previousOperator === "÷"){
             tempNum /= tempBuffer;
        }
        previousOperator = '';
        previousNum = tempNum.toFixed(0);
        justCalculated = true;
        buffer = tempNum.toFixed(0);
    }
}

function redisplay(){
    display.innerText = buffer.toString();
}
