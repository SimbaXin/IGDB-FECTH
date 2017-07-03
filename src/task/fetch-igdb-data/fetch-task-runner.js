require('isomorphic-fetch');
const config = require('../../../app.config').IGDB;

async function oneFetch(model, path, offset, limit, taskQueue, parallel, resolve, additionalQuery) {
  try {
    // console.log(`Fetch ${path} model data ${offset}...`);
    let response = await fetch(`${config.BASE_URL}/${config.PATH[path]}/?fields=*&limit=${limit}&offset=${offset}&order=release_dates.date:desc`, { headers: {'X-Mashape-Key': config.API_KEY } });
    let docs = await response.json();
    
    if (docs instanceof Array && docs.length > 0) {
      await Promise.all(docs.map(doc => {
          var _document = new model(doc);
          return _document.save();
        }
      ));

      if (taskQueue.length <= parallel) {
        let nextIndex = taskQueue[taskQueue.length - 1] + 1;
        if ((nextIndex * limit - 1 + limit) < 10000) {
          taskQueue.push(nextIndex);
          oneFetch(model, path, nextIndex * limit - 1, limit, taskQueue, parallel, resolve, additionalQuery);
        }
      }
    }
  } catch(err) {
    console.error(err);
  } finally {
    if (taskQueue.length > 0) {
      taskQueue.shift();
    }
    // console.log(offset);
    if (taskQueue.length === 0) {
      resolve();
      console.log('concurrentRunTask done.');
    }
  }

}

exports.concurrentRunTask = async function(model, path, resolve, additionalQuery=null) {
  let limit = 50;
  let parallel = 25;

  let taskQueue = [];

  for (let i = 0; i < parallel; i++) {
    taskQueue.push(i);
    oneFetch(model, path, i * limit - 1, limit, taskQueue, parallel, resolve, additionalQuery);
  }
}

exports.simpleRunTask = async function(model, path, resolve, additionalQuery=null) {
  try {
    let response = await fetch(`${config.BASE_URL}/${config.PATH[path]}/?fields=*`, { headers: {'X-Mashape-Key': config.API_KEY } });
    let docs = await response.json();
    
    if (docs instanceof Array && docs.length > 0) {
      await Promise.all(docs.map(doc => {
          var _document = new model(doc);
          return _document.save();
        }
      ));
    }
  } catch(err) {
    console.error(err);
  } finally {
    console.log('simpleRunTask done.');
    resolve();
  }
}
