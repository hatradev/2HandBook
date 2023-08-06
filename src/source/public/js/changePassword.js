// changePassword.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-1');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(form);
  
      // Make an AJAX request to change the password
      fetch(`/account/change-password`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          if (data.success) {
            alert('Password changed successfully!');
            form.reset(); // Clear the form after successful password change
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });
  