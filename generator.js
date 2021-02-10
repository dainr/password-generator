//getting DOM elements
const resultDOM = document.getElementById('result');
const copybtnDOM = document.getElementById('copy');
const lengthDOM = document.getElementById('length');
const uppercaseDOM  = document.getElementById('uppercase');
const numbersDOM = document.getElementById('numbers');
const symbolsDOM = document.getElementById('symbols');
const generatebtn = document.getElementById('generate');
const form = document.getElementById('passwordGeneratorForm');

let arrayFromLowToHigh = (low, high) => {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }

    return array;
}

//Generating Character Codes
const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CODES = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126));

form.addEventListener('submit',  (e) => {
    e.preventDefault();

    const characterAmount = lengthDOM.value;
    const includeUppercase = uppercaseDOM.checked;
    const includeNumbers = numbersDOM.checked;
    const includesSymbols = symbolsDOM.checked;
    const password = generatePassword(
        characterAmount,
        includeUppercase,
        includeNumbers,
        includesSymbols
    );

    resultDOM.innerText = password;
});

// copy password to clipboard
copybtnDOM.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const passwordToCopy = resultDOM.innerText;

    // edge case when password is empty
    if (!passwordToCopy) return;

    // copy functionalty;
    textarea.value = passwordToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to Clipboard');
});
 

let generatePassword = (
    characterAmount,
    includeUppercase,
    includeNumbers,
    includesSymbols
) => {
    let charCodes = LOWERCASE_CODES;

    if (includeUppercase) {
        charCodes = charCodes.concat(UPPERCASE_CODES);
    }
    if (includesSymbols) {
        charCodes = charCodes.concat(SYMBOL_CODES);
    }
    if (includeNumbers) {
        charCodes = charCodes.concat(NUMBER_CODES);
    }

    const passwordCharacters = [];

    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }

    return passwordCharacters.join('');
 }


 

