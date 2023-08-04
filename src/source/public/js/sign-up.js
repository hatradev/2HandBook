const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPwdInput = document.getElementById('confirm-pwd');
const passwordMatchMsg = document.getElementById('password-match-msg');
const dobInput = document.getElementById('dob');
const dobErrorMsg = document.getElementById('dob-error-msg');
const signUpForm = document.querySelector('.su-form');
const signUpButton = document.querySelector('.su-button');
const acceptCheckbox = document.getElementById('accept-sign-up-form');
const acceptErrorMsg = document.getElementById('accept-error-msg');
const emailInput = document.getElementById('email');
const emailErrorMsg = document.getElementById('email-error-msg');
const requiredFields = document.querySelectorAll('input[required]');
const pwdValid = document.querySelector('#password-valid');

function removeRequiredMessage() {
  requiredFields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.nextElementSibling.textContent == 'This field is required !') {
        field.nextElementSibling.remove();
      }
    });
  });
}

function validateRequiredForm() {
  let flag = true;
  for (const field of requiredFields) {
    console.log(field);
    if (field.value === '') {
      if (field.nextElementSibling.textContent != 'This field is required !') {
        field.insertAdjacentHTML(
          'afterend',
          '<p style="color:red;">This field is required !</p>'
        );
      }
      flag = false;
    }
  }

  return flag;
}

function checkEmailValidity() {
  const emailValue = emailInput.value;
  // Use a regular expression to check the email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    emailErrorMsg.textContent = 'Please enter a valid email address.';
  } else {
    emailErrorMsg.textContent = '';
  }
}

function checkDateOfBirth() {
  const dobValue = dobInput.value;
  const currentDate = new Date();
  const inputDate = new Date(dobValue);

  if (inputDate > currentDate) {
    dobErrorMsg.textContent =
      'Please enter a valid date of birth earlier than the current date.';
  } else {
    dobErrorMsg.textContent = '';
  }
}

function checkPassword() {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!re.test(passwordInput.value)) {
    pwdValid.textContent =
      'Password must have at least 6 letter password, with at least a symbol, upper and lower case letters and a number';
    passwordMatchMsg.style.color = 'red';
    return false;
  } else {
    pwdValid.textContent = '';
    return true;
  }
}

function checkPasswordMatch() {
  const passwordValue = passwordInput.value;
  const confirmPwdValue = confirmPwdInput.value;

  if (passwordValue === confirmPwdValue) {
    passwordMatchMsg.textContent = 'Passwords match.';
    passwordMatchMsg.style.color = 'green';
    return true;
  } else {
    passwordMatchMsg.textContent = 'Passwords do not match.';
    passwordMatchMsg.style.color = 'red';
    return false;
  }
}

function checkAcceptCheckbox(event) {
  event.preventDefault();
  if (validateRequiredForm() && checkPassword() && checkPasswordMatch()) {
    if (!acceptCheckbox.checked) {
      acceptErrorMsg.textContent =
        'Please read and agree to the Terms and Conditions.';
    } else {
      acceptErrorMsg.textContent = '';
      signUpForm.submit();
    }
  }
}

phoneInput.addEventListener('input', () => {
  const inputValue = phoneInput.value.trim();
  const cleanedValue = inputValue.replace(/\D/g, '');
  const truncatedValue = cleanedValue.slice(0, 15);
  phoneInput.value = truncatedValue;
});

dobInput.addEventListener('input', checkDateOfBirth);
emailInput.addEventListener('input', checkEmailValidity);
passwordInput.addEventListener('input', checkPassword);
confirmPwdInput.addEventListener('input', checkPasswordMatch);
signUpButton.addEventListener('click', checkAcceptCheckbox);
removeRequiredMessage();
