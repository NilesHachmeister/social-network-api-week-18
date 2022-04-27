const { connect, connection } = require('mongoose');

// connecting to the database
connect('mongodb://localhost/userThoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
