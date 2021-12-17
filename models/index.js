const User = require('./User');
const Entry = require('./Entry');

User.hasMany(Entry);
Entry.belongsTo(User);

module.exports = { User, Entry };