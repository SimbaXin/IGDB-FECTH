const mongoose = require('mongoose');

let PlatformSchema = new mongoose.Schema({
  id:  Number,
  name: String,
  created_at:   Number,
  updated_at:   Number,
  slug: String,
  url: String,
  logo: {
    url: String,
    width: Number,
    height: Number,
    cloudinary_id: String
  },
  website: String,
  summary: String,
  alternative_name: String,
  generation: Number,
  games: [ Number ],
  version: {
    "url": String,
    "logo": {
        "url": String,
        "width": Number,
        "height": Number,
        "cloudinary_id": String
    },
    "name": String,
    "slug": String,
    "summary": String,
    "release_dates": [
      {
        date: Number,
        region: Number
      }
    ]
  }
});

PlatformSchema.pre('save', function(next) {
  this.fetch_at = Date.now();
  next();
});

module.exports = mongoose.model('Platform', PlatformSchema);
