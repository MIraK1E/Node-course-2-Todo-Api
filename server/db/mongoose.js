const mongoose = require('mongoose');

// setup a uri for mongodb server
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'

mongoose.Promise = global.Promise; 
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };