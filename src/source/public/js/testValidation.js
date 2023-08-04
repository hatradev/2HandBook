// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the form element
    const form = document.getElementById('form-1');
  
    // Get references to the form fields
    const shopNameInput = document.getElementById('shop-name');
    const jobSelect = document.getElementById('job');
    const agreeTermCheckbox = document.getElementById('flexCheckDefault');
  
    // Function to display an error message for a form field
    function displayErrorMessage(inputElement, message) {
      const formMessage = inputElement.parentNode.querySelector('.form-message');
      formMessage.textContent = message;
    }
  
    // Function to remove the error message for a form field
    function clearErrorMessage(inputElement) {
      const formMessage = inputElement.parentNode.querySelector('.form-message');
      formMessage.textContent = '';
    }
  
    // Function to validate the form when it is submitted
    function validateForm(event) {
      // Prevent the default form submission behavior
      event.preventDefault();
  
      // Check if the name of the shop is empty
      if (shopNameInput.value.trim() === '') {
        displayErrorMessage(shopNameInput, 'Please enter the name of your shop.');
        return;
      } else {
        clearErrorMessage(shopNameInput);
      }
  
      // Check if a job option is selected
      if (jobSelect.value === '-- Choose --') {
        displayErrorMessage(jobSelect, 'Please select a valid job option.');
        return;
      } else {
        clearErrorMessage(jobSelect);
      }
  
      // Check if the user has agreed to the terms and conditions
      if (!agreeTermCheckbox.checked) {
        displayErrorMessage(agreeTermCheckbox, 'Please agree to the terms and conditions.');
        return;
      } else {
        clearErrorMessage(agreeTermCheckbox);
      }
  
      // If all validations pass, you can submit the form
      form.submit();
    }
  
    // Add the event listener to the form submission
    form.addEventListener('submit', validateForm);
  });
  