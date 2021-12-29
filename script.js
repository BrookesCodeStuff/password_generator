// Assignment code here
// Password character type object
var passTypes = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  'special characters': '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
};

// The chosen parameters of our password
var passParams = {
  length: 0,
  types: [],
  reset: function () {
    this.length = 0;
    this.types = [];
  },
};

// Randomly choose a number based on length of passed variable
var rand = function (howLong) {
  return Math.floor(Math.random() * howLong);
};

// Get password parameters
var getParams = function () {
  // Set a counter to be used for the character type prompts
  var count = 0;

  // Loop until all conditions for a valid password are met
  // Must be at least 8 characters and fewer than 128
  // Must use at least one type of character (lowercase, uppercase, numbers, or special)
  while (passParams.length === 0 || passParams.types.length === 0) {
    // Get the desired password length
    if (passParams.length === 0) {
      var getLength = prompt(
        'How long should the password be? Password should be between 8 and 128 characters.'
      );
      // If the password doesn't meet the lenght requirements
      // or is blank or not a number, re-prompt
      if (getLength < 8 || getLength > 128 || !parseInt(getLength)) {
        alert(
          'That is an invalid choice. Password should be a number between 8 and 128 characters.'
        );
      } else {
        // Store the password length as an integer (sorry, no PI)
        passParams.length = parseInt(getLength);
      }
      // If password length is good, get character type choices
    } else if (passParams.types.length === 0) {
      // Loop through the keys of the passTypes object
      for (var i in passTypes) {
        var response = confirm(
          'Do you want ' + i + ' to be used in your password?'
        );
        // Increase the counter so we can validate if every option
        // has been seen at least once
        count++;
        // Add the chosen chartype to the password parameter choices
        if (response) {
          passParams.types.push(i);
        } else if (
          // If the response is falsy, no choices have been made,
          // and every option has been seen at least once then
          // start the loop over again (counter will reset)
          !response &&
          passParams.types.length === 0 &&
          count == Object.keys(passTypes).length
        ) {
          alert('You must choose at least one character type.');
          getParams();
        }
      }
    }
  }
};

var generatePassword = function () {
  // Initialize or reset the password
  var password = '';

  // Reset any previously chosen password parameters
  passParams.reset();

  // Get password parameter choices
  getParams();

  // Set the parameters into variables for ease of use
  var passwordLength = passParams.length;
  var passwordTypes = passParams.types;

  // Loop until the password is as long as the user's choice
  while (password.length < passwordLength) {
    // Get a random character type from the user's choices
    var pickedType = passwordTypes[rand(passwordTypes.length)];

    // Get the characters in that type
    var chars = passTypes[pickedType];

    // Get a random character from the picked characters
    // and add it to the password string
    password += chars[rand(chars.length)];
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
