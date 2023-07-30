document.addEventListener('DOMContentLoaded', function () {
  // Mong muốn của chúng ta
  Validator({
    form: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      //Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
      Validator.isRequired('#shop-name', 'Please enter your name of your shop'),
      Validator.isRequired('#job', 'Please enter your job'),
      Validator.isRequired('#address', 'Please enter address'),
      Validator.isRequired(
        '#flexCheckDefault',
        'Must commit before becoming a seller of 2HandBook'
      ),

      /*Validator.isEmail('#email'),
      Validator.minLength('#password', 6),
      Validator.isRequired('#password_confirmation'),
      Validator.isConfirmed('#password_confirmation', function () {
        return document.querySelector('#form-1 #password').value;
      }, 'Mật khẩu nhập lại không chính xác')*/
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
