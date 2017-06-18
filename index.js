const mongooseConnector = require('./src/util/mongoose-connection');
const fechTasks = require('./src/task');

(async function() {
  mongooseConnector.connect('localhost:27017/gameinfomanager');
  await fechTasks();
  mongooseConnector.disconnect();
})();
