// Assignment code here
// Randomly choose a number based on length of passed variable
var rand = function (howLong) {
  return Math.floor(Math.random() * howLong);
};

var generatePassword = function () {
  var password = '';
  var a = 'abcdefghijklmnopqrstuvwxyz';
  var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var n = '0123456789';
  var s = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  var passwordLength = 8;
  var passwordTypes = [a, A, n, s];

  // Loop until the password is as long as the user's choice
  while (password.length < passwordLength) {
    // Get a random character type from the user's choices
    var pickedType = passwordTypes[rand(passwordTypes.length)];

    // Get a random character from the picked character type
    // and add it to the password string
    password += pickedType[rand(pickedType.length)];
  }
  return password;
};

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
