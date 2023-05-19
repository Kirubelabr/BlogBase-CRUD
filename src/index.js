const { port, env } = require('./config/vars');
const mongoose = require('./config/mongoose');
const app = require('./config/express');

// db connection
mongoose.connect();

// app listening to port 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port} (${env})`);
});

module.exports = app;
