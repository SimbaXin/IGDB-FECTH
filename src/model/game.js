const mongoose = require('mongoose');

let GameSchema = new mongoose.Schema({
  id:  Number,
  name: String,
  created_at:   Number,
  updated_at:   Number,
  slug: String,
  url: String,
  summary: String,
  storyline: String,
  // collection:  Number,
  franchise:  Number,
  hypes:  Number,
  popularity: Number,
  rating:  Number,
  rating_count:  Number,
  aggregated_rating:  Number,
  aggregated_rating_count:  Number,
  total_rating:  Number,
  total_rating_count:  Number,
  game:  Number,  // ID of a Game record if this record is a DLC/expansion
  developers: [ Number ],
  publishers: [ Number ],
  game_engines: [ Number ],
  category: Number, // 0 - Main game, 1 - DLC/Addon, 2 - Expansion, 3 - Bundle, 4 - Standalone expansion
  time_to_beat: {   // Number of seconds
    hastly:  Number,
    normally: Number,
    completely: Number
  },
  player_perspectives:  [ Number ],
  game_modes:  [ Number ],
  keywords: [ Number ],
  themes: [ Number ],
  genres: [ Number ],
  first_release_date: Number,  // Unix epoch
  status: Number,  // 0 - Released, 2 - Alpha, 3  - Beta, 4 - Early access, 5 - Offline, 6  - Cancelled
  release_dates: [ mongoose.Schema.Types.Mixed ],
  alternative_names: [{
    name: String,
    comment: String
  }],
  screenshots: [{
    url: String,
    width: Number,
    height: Number,
    cloudinary_id: String
  }],
  videos: [{
    name: String,
    id: String
  }],
  cover: [{
    url: String,
    width: Number,
    height: Number,
    cloudinary_id: String
  }],
  esrb: {
    rating: Number,  // 1 - RP, 2 - EC, 3 - E, 4 - E10+, 5 - T, 6 - M, 7 - AO
    synopsis: String
  },
  pegi: {
    rating: Number,  // 1 - 3, 2 - 7, 3 - 12, 4 - 16, 5 - 18
    synopsis: String
  },
  websites: [{
    category:  Number,  // 1 - official, 2 - wikia, 3 - wikipedia, 4 - facebook, 5 - twitter, 6 - twitch, 8 - instagram, 9 - youtube, 10 - iphone, 11 - ipad, 12 - android, 13 - steam
    url:  String
  }],
  tags: [ Number ]
});

GameSchema.pre('save', function(next) {
  this.fetch_at = Date.now();
  next();
});

module.exports = mongoose.model('Game', GameSchema);
