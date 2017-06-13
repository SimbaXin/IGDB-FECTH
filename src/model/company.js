const mongoose = require('mongoose');

let CompanySchema = new mongoose.Schema({
  id:  Number,
  name: String,
  created_at:   Number,
  updated_at:   Number,
  slug: String,
  url: String,
  start_date_category: Number,
  change_date_category: Number,
  published: [ Number ],
  developed: [ Number ],
  country: Number,
  website: String,
  logo: {
    url: String
  },
  description: String,
  parent: Number,
  fetch_at: Number
});

CompanySchema.pre('save', function(next) {
  this.fetch_at = Date.now();
  next();
});

module.exports = mongoose.model('Company', CompanySchema);
