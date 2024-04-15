const passDisplay = document.querySelector("#display-pass");
const rangeSlider = document.querySelector("[range-slider]");
const dataCpyMsg = document.querySelector("[datacpy-msg]");
const copyPassBtn = document.querySelector("[copy-pass-btn]");
const allchkbox = document.querySelectorAll("input[type=checkbox]");
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const number = document.getElementById('number');
const spChar = document.querySelector("#special");
const passGenBtn = document.getElementById('pass-gen-btn');
const passLen = document.querySelector("[pass-len]");
const strengthIndicator = document.querySelector('[pass-strength-indicator]');
let symbols = `!@#$%^&*[{(<>)}]-=_+|,./?;:'"\\`;


passLen.innerHTML = rangeSlider.value;
// passLen.value = rangeSlider.value;
// passLen.addEventListener("change", () => {
//   rangeSlider.value = passLen.value;
// })

// rangeSlider.addEventListener("input", () => {
//   passLen.innerHTML = rangeSlider.value;

// });
//* setting password length same as the input range as we change it
rangeSlider.addEventListener("input", setPassLen);
//*function for setting password lenght same as the value of slider
function setPassLen() {
  passLen.innerHTML = rangeSlider.value;
  // passLen.value = rangeSlider.value;
}
//*counting the no of checkboxes checked
upper.checked=true;
let count = 1;
Array.from(allchkbox).forEach(chkbox=>{
  chkbox.addEventListener("change", () => {
    if (chkbox.checked) {
      count++;
    }
    else {
      count--;
    }
    //* setting the slider and password length if the no of checked boxes are greater than range value
    if (count > rangeSlider.value) {
      rangeSlider.value = count;
      setPassLen();
    }

  })
})

//*generating random integer between the range
function genRndmInt(min, max) {
  return Math.floor((max - min) * Math.random() + min);
}
//*generating random upper case letter
function genRndmUpper() {
  return String.fromCharCode(genRndmInt(65, 91));
}
//*generating random lower case letter
function genRndmLower() {
  return String.fromCharCode(genRndmInt(97, 123));
}
//*generating random number less than 10
function genRndmNumber() {
  return genRndmInt(0, 10);
}
//*generating random special character
function genRndmSpChar() {
  return symbols.charAt([genRndmInt(0, symbols.length)]);
}

//*generating actual password
function genPassword() {
  let pas = "";
  let funcArray = [];
//* Adding the functions to array based on checked boxes
  if (upper.checked)
    funcArray.push(genRndmUpper);

  if (lower.checked)
    funcArray.push(genRndmLower);

  if (number.checked)
    funcArray.push(genRndmNumber);

  if (spChar.checked)
    funcArray.push(genRndmSpChar);

//*adding the compulsory elements
  for (let i = 0; i < funcArray.length; i++)
     pas += funcArray[i]();


//*adding the remaining elements to the password
  for (let i = 0; i < passLen.innerHTML - count; i++){
    pas += funcArray[genRndmInt(0, funcArray.length)]();
  }

  return pas;
}

//*calling all the function on clicking Generate Password
passGenBtn.addEventListener('click', () => {
    if (count < 1)
      alert('atleast one checkbox must be ticked');
    else if (rangeSlider.value < count)
      alert('Password length should be greater or equal to no of ticked checkboxes');
    else {
    let pas = genPassword()
    let password = shuffelPass(pas)
    passDisplay.value = password;
    // console.log(password.length);
    let color = passwordStrength();
    // console.log(color);
    strengthIndicator.style.cssText=`width:30px; height:30px; background-color:${color}; box-shadow:0px 0 10px 3px ${color}; border-radius:100%`
  }

  });

//* Shuffeling the pasString generated
function shuffelPass(pasString) {
  let pasArray = Array.from(pasString);
  for (let i = 0; i < pasArray.length; i++) {
    let index = genRndmInt(0, pasArray.length)
    let temp = pasArray[i];
    pasArray[i] = pasArray[index];
    pasArray[index] = temp;
  }
  //returning the string of shuffeled password as arrayname.join is used to join the elements of array with given character and returns the string of joined elements
  return pasArray.join("");
}

function passwordStrength() {
  if (passLen.innerHTML > 8 && count >= 4) {
    return "green";
  }
  else if ((passLen.innerHTML > 8 && count>=2) || (count >= 4 && passLen.innerHTML<8)) {
    return "greenyellow"
  }
  else {
    return "red"
  }
}


//*copy to clipboard function
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(passDisplay.value);
    dataCpyMsg.innerHTML='Copied';
  } catch (error) {
    dataCpyMsg.innerHTML = 'Failed';
  }

  dataCpyMsg.style.display = 'inline-block';
  setTimeout(() => {
    dataCpyMsg.style.display = 'none';
  }, 2000);

}
//* calling the copyToClipboard function on button click
copyPassBtn.addEventListener('click', () => {
  if (passDisplay.value) {
    copyToClipboard();
  }
});


//TODO Work on this later on as it is an addition feature for password generator to ask the user for special symbol that he/she needs in the password
// let spStr;
// spChar.addEventListener("change", () => {
//   if (spChar.checked) {
//     spStr = prompt("Enter the special characters you want in your password");
//   }
//   console.log(spStr)
// });
