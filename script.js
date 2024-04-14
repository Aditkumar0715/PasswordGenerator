

const passgen = document.querySelector("#pass-gen");
const rangeSlider = document.querySelector("[range-slider]");
const allchkbox = document.querySelectorAll("input[type=checkbox]");
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const number = document.getElementById('number');
const spChar = document.querySelector("#special");
const passGenBtn = document.getElementById('pass-gen-btn');
const passLen = document.querySelector("[pass-len]");
const strengthIndicator = document.querySelector('[pass-strength-indicator]')
let spArray = ['!', '@', '#', '$', '%', '^', '&', '*', '_', '-', '+'];

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
document.querySelector('#upper').checked=true;
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
  return spArray[genRndmInt(0, spArray.length)];
}

//*generating actual password
function genPassword() {
  let pas = "";
  let rndmFunc = [];

  if (upper.checked) {
    pas += genRndmUpper();
    rndmFunc.push(genRndmUpper);
  }
  if (lower.checked) {
    pas += genRndmLower();
    rndmFunc.push(genRndmLower);
  }
  if (number.checked) {
    pas += genRndmNumber();
    rndmFunc.push(genRndmNumber);
  }
  if (spChar.checked) {
    pas += genRndmSpChar();
    rndmFunc.push(genRndmSpChar);
  }

  for (let i = 0; i < passLen.innerHTML - count; i++){
    pas += rndmFunc[genRndmInt(0, rndmFunc.length)]();
  }

  return pas;
}

//*calling the function on button click
passGenBtn.addEventListener('click', () => {
  let pas = genPassword()
  let password = shuffelPass(pas)
  passgen.value = password;
  // console.log(password.length);
  let color = passwordStrength();
  // console.log(color);
  strengthIndicator.style.cssText=`width:30px; height:30px; background-color:${color}; border:2px solid black; border-radius:100%`

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
  return pasArray.join("");
}

function passwordStrength() {
  if (passLen.innerHTML > 8 && count >= 4) {
    return "green";
  }
  else if ((passLen.innerHTML > 8 && count>=3) || (count >= 3 && passLen.innerHTML>4)) {
    return "greenyellow"
  }
  else if (passLen.innerHTML >= 8 || (count >=2 && passLen.innerHTML>4)) {
    return "yellow";
  }
  else {
    return "red"
  }
}



//TODO Work on this later on as it is an addition feature for password generator to ask the user for special symbol that he/she needs in the password
// let spStr;
// spChar.addEventListener("change", () => {
//   if (spChar.checked) {
//     spStr = prompt("Enter the special characters you want in your password");
//   }
//   console.log(spStr)
// });
