const mongooseConnector = require('./src/util/mongoose-connection');
const fetchCompanyData = require('./src/task/fetch-company-data');

mongooseConnector.connect('localhost:27017/gameinfomanager');
fetchCompanyData()
  .catch(err => console.error(err))
  .then(() => mongooseConnector.disconnect());
