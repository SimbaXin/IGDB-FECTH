const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

exports.connect = function(databaseUrl) {
  mongoose.connect(`mongodb://${databaseUrl}`);
}

exports.disconnect = function() {
  mongoose.disconnect();
}
