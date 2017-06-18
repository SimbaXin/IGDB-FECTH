const fetchIgdbTask = require('./fetch-igdb-data');

module.exports = async function() {
  console.log('before all task');
  await fetchIgdbTask();
  console.log('all task done.');
}
