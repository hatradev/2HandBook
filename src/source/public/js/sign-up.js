const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', () => {
    const inputValue = phoneInput.value.trim();
    const cleanedValue = inputValue.replace(/\D/g, '');
    const truncatedValue = cleanedValue.slice(0, 15);
    phoneInput.value = truncatedValue;
});





const passwordInput = document.getElementById('password');
const confirmPwdInput = document.getElementById('confirm-pwd');
const passwordMatchMsg = document.getElementById('password-match-msg');

function checkPasswordMatch() {
    const passwordValue = passwordInput.value;
    const confirmPwdValue = confirmPwdInput.value;

    if (passwordValue === confirmPwdValue) {
        passwordMatchMsg.textContent = 'Passwords match.';
        passwordMatchMsg.style.color = 'green';
    } else {
        passwordMatchMsg.textContent = 'Passwords do not match.';
        passwordMatchMsg.style.color = 'red';
    }
}

confirmPwdInput.addEventListener('input', checkPasswordMatch);




const dobInput = document.getElementById('dob');
const dobErrorMsg = document.getElementById('dob-error-msg');

function checkDateOfBirth() {
    const dobValue = dobInput.value;
    const currentDate = new Date();
    const inputDate = new Date(dobValue);

    if (inputDate > currentDate) {
        dobErrorMsg.textContent = 'Please enter a valid date of birth earlier than the current date.';
    } else {
        dobErrorMsg.textContent = '';
    }
}

dobInput.addEventListener('input', checkDateOfBirth);





const signUpForm = document.getElementById('su-form');
const signUpButton = document.querySelector('.su-button');
const acceptCheckbox = document.getElementById('accept-sign-up-form');
const acceptErrorMsg = document.getElementById('accept-error-msg');

function checkAcceptCheckbox(event) {
    event.preventDefault();
    if (!acceptCheckbox.checked) {
        acceptErrorMsg.textContent = 'Please read and agree to the Terms and Conditions.';
    } else {
        acceptErrorMsg.textContent = '';
        signUpForm.submit();
    }
}

signUpButton.addEventListener('click', checkAcceptCheckbox);




const emailInput = document.getElementById('email');
const emailErrorMsg = document.getElementById('email-error-msg');

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

emailInput.addEventListener('input', checkEmailValidity);