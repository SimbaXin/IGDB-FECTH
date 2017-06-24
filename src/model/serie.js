const mongoose = require('mongoose');

let SerieSchema = new mongoose.Schema({
  id:  Number,
  name: String,
  created_at:   Number,
  updated_at:   Number,
  slug: String,
  url: String,
  games: [ Number ]
});

SerieSchema.pre('save', function(next) {
  this.fetch_at = Date.now();
  next();
});

module.exports = mongoose.model('Serie', SerieSchema);
