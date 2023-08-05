const Mailjet = require('node-mailjet');

function sendForgotPasswordMail(user, host, newPassword) {
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'twohandbookse@gmail.com',
          Name: '2HandBook',
        },
        To: [
          {
            Email: user.email,
            Name: `${user.firtName} ${user.lastName}`,
          },
        ],
        Subject: '[2Handbook] Reset Password',
        HTMLPart: `
        <p>Hi ${user.firstName} ${user.lastName},</p>
        <p>You recently requested to reset the password for your ${host} account. Here is your new password: </p>
        <strong>${newPassword}</strong>
        <p>Please use it to login again and change it later if you want.</p>
        <p>If you did not request a password reset, please ignore this email or reply to let us know.</p>

        <p>Thanks,</p>
        <p>2HandBook team</p>
        `,
      },
    ],
  });
  return request;
}

module.exports = { sendForgotPasswordMail };
