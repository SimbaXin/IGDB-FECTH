require('isomorphic-fetch');
const config = require('../../app.config').IGDB;
const CompanyModel = require('../model/company');

function oneFetch(offset, limit) {
  return fetch(`${config.BASE_URL}/${config.PATH.company}/?fields=*&limit=${limit}&offset=${offset}`, { headers: {'X-Mashape-Key': config.API_KEY } })
    .then(response => response.json())
    .then(docs => {
      if (!docs instanceof Array || docs.length === 0) throw false;
      return docs;
    })
    .then(data => Promise.all(data.map(doc => {
      var company = new CompanyModel(doc);
      return company.save();
    })))
    .catch(err => console.log(err))
    .then(() => true);
}

module.exports = async function() {
  let offset = 0;
  let limit = 50;
  let parallel = 5;
  let loop = true
  while (loop) {
    loop = await oneFetch(offset, limit);
    offset += limit;
    console.log(offset);
  }
}