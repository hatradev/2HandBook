document.addEventListener('DOMContentLoaded', function () {
  // Mong muốn của chúng ta
  Validator({
    form: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      //Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
      Validator.isRequired('#first_name', 'Please enter your first name'),
      Validator.isRequired('#last_name', 'Please enter your last name'),
      Validator.isRequired('#display_name', 'Please enter display name'),
      Validator.isRequired('#phone_number'),

      Validator.isEmail('#email'),
      Validator.minLength('#password', 6),
      Validator.isRequired('#password_confirmation'),
      Validator.isConfirmed(
        '#password_confirmation',
        function () {
          return document.querySelector('#form-1 #password').value;
        },
        'Mật khẩu nhập lại không chính xác'
      ),
    ],
    onSubmit: function (data) {
      // Call API
      console.log(data);
    },
  });

  Validator({
    form: '#form-2',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [Validator.isEmail('#email'), Validator.minLength('#password', 6)],
    onSubmit: function (data) {
      // Call API
      console.log(data);
    },
  });
});
