// Assignment code here
// Password character type object
var passTypes = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  'special characters': '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
};

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
  var count = 0;
  while (passParams.length === 0 || passParams.types.length === 0) {
    if (passParams.length === 0) {
      var getLength = prompt(
        'How long should the password be? Password should be between 8 and 128 characters.'
      );

      if (getLength < 8 || getLength > 128) {
        alert(
          getLength +
            ' is an invalid choice. Password should be between 8 and 128 characters.'
        );
      } else {
        passParams.length = getLength;
      }
    } else if (passParams.types.length === 0) {
      for (var i in passTypes) {
        var response = confirm(
          'Do you want ' + i + ' to be used in your password?'
        );
        count++;
        if (response) {
          passParams.types.push(i);
        } else if (
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
  var password = '';

  passParams.reset();

  getParams();
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
