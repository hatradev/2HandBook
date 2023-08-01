const database = require('../config/db.config');
const app = require('./app');

database.connect();
const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port} ...`);
});
