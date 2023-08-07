// Get a reference to the form element
const form = document.getElementById('form-1');

// Function to perform form validation
function validateForm(event) {
  event.preventDefault(); // Prevent form submission for now

  // Get input field values
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const job = document.getElementById('job');
  const presentPassword = document.getElementById('presentPassword');
  const newPassword = document.getElementById('newPassword');

  
  
  // Function to display an error message and add red border to a field
  function showErrorField(field) {
    field.style.border = '1px solid red';
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerText = 'This field is required.';
    field.parentNode.appendChild(errorMessage);
  }

  // Function to clear error message and red border from a field
  function clearErrorField(field) {
    field.style.border = '';
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.parentNode.removeChild(errorMessage);
    }
  }

  // Remove all previously displayed error messages
  const errorMessages = form.getElementsByClassName('error-message');
  while (errorMessages.length > 0) {
    errorMessages[0].parentNode.removeChild(errorMessages[0]);
  }

  // Clear error messages and red borders as the user types
  firstName.addEventListener('input', function () {
    clearErrorField(firstName);
  });

  lastName.addEventListener('input', function () {
    clearErrorField(lastName);
  });

  address.addEventListener('input', function () {
    clearErrorField(address);
  });

  email.addEventListener('input', function () {
    clearErrorField(email);
  });

  phone.addEventListener('input', function () {
    clearErrorField(phone);
  });

  job.addEventListener('input', function () {
    clearErrorField(job);
  });

  // Perform validation checks
  if (firstName.value.trim() === '') {
    showErrorField(firstName);
    firstName.focus();
    return;
  }

  if (lastName.value.trim() === '') {
    showErrorField(lastName);
    lastName.focus();
    return;
  }

  if (address.value.trim() === '') {
    showErrorField(address);
    address.focus();
    return;
  }

  if (email.value.trim() === '') {
    showErrorField(email);
    email.focus();
    return;
  }

  if (phone.value.trim() === '') {
    showErrorField(phone);
    phone.focus();
    return;
  }

  if (job.value.trim() === '') {
    showErrorField(job);
    job.focus();
    return;
  }

  // You can add more specific validation checks for each field if needed,
  // e.g., check if the email is in a valid format or the phone number is numeric.

  // If the form passes all validation checks, you can submit it programmatically
  form.submit();
}

// Add event listener to the form's submit event
form.addEventListener('submit', validateForm);
