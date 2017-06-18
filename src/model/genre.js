const mongoose = require('mongoose');

let GenreSchema = new mongoose.Schema({
  id:  Number,
  name: String,
  created_at:   Number,
  updated_at:   Number,
  slug: String,
  url: String,
  games: [ Number ]
});

GenreSchema.pre('save', function(next) {
  this.fetch_at = Date.now();
  next();
});

module.exports = mongoose.model('Genre', GenreSchema);
