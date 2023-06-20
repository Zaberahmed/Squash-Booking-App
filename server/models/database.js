const mongoose = require('mongoose');
const DATABASE_PORT = 27017;
const DATABASE_NAME = 'squash';

mongoose.connect(`mongodb://127.0.0.1:${DATABASE_PORT}/${DATABASE_NAME}`);

module.exports = mongoose;
