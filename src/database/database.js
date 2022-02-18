const { database } = require('../keys');

const mongoose = require('mongoose');
const db = require('mongoose');

// inport model docuement database
const schemaUsers = require('./model.user');
// const schemaMessages = require('./model.message');
// const schemaChats = require('./model.chat');

// create Models
const ModelUser = mongoose.model('users', schemaUsers);
// const ModelMessage = mongoose.model('messages', schemaMessages);
// const ModelChat = mongoose.model('chats', schemaChats);

const { user, password } = database;

const URI = `mongodb+srv://${user}:${password}@fin-data-grup.fl0rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

db.Promise = global.Promise;
db.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('[data-base] yes!'))
.catch(err => console.error('[DATABASE ERROR]', err))


module.exports = {
  db,
  ModelUser
}