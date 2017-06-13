require('isomorphic-fetch');
const config = require('../../app.config').IGDB;
const CompanyModel = require('../model/company');
const mongooseConnector = require('../util/mongoose-connection');

async function oneFetch(offset, limit, taskQueue, parallel) {
  try {
    let response = await fetch(`${config.BASE_URL}/${config.PATH.company}/?fields=*&limit=${limit}&offset=${offset}`, { headers: {'X-Mashape-Key': config.API_KEY } });
    let docs = await response.json();
    
    if (docs instanceof Array && docs.length > 0) {
      await Promise.all(docs.map(doc => {
          var company = new CompanyModel(doc);
          return company.save();
        }
      ));

      if (taskQueue.length <= parallel) {
        let nextIndex = taskQueue[taskQueue.length - 1] + 1;
        taskQueue.push(nextIndex);
        oneFetch(nextIndex * limit - 1, limit, taskQueue, parallel);
      }
    }
  } catch(err) {
    console.error(err);
  } finally {
    if (taskQueue.length > 0) {
      taskQueue.shift();
    }
    console.log(offset);
    if (taskQueue.length === 0) {
      mongooseConnector.disconnect();
      console.log('disconnect');
    }
  }

}

module.exports = async function() {
  let limit = 50;
  let parallel = 50;

  let taskQueue = [];
  for (let i = 0; i < parallel; i++) {
    taskQueue.push(i);
    oneFetch(i * limit - 1, limit, taskQueue, parallel);
  }
}
