const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = {
  connect: () => {
    dotenv.config({ path: './config.env' });
    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );

    mongoose.connect(DB).then(() => console.log('DB connection successful!'));
  },
};
