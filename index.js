const mongooseConnector = require('./src/util/mongoose-connection');
const tasks = require('./src/task');

(async function() {
  mongooseConnector.connect('localhost:27017/gameinfomanager');
  await tasks();
  mongooseConnector.disconnect();
})();
