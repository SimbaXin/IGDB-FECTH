let { concurrentRunTask, simpleRunTask } = require('./fetch-task-runner');

let CompanyModel = require('../../model/company');
let GameModel = require('../../model/game');
let GenreModel = require('../../model/genre');
let SerieModel = require('../../model/serie');

async function runAsyncTask(model, path, task, additionalQuery) {
  return new Promise((resolve, reject) => {
    task(model, path, resolve, additionalQuery);
  });
}

module.exports = async function() {
  console.log('before igdb task');
  await runAsyncTask(CompanyModel, 'company', concurrentRunTask);
  await runAsyncTask(GenreModel, 'genre', simpleRunTask);
  await runAsyncTask(GameModel, 'game', concurrentRunTask);
  await runAsyncTask(SerieModel, 'serie', simpleRunTask);
  console.log('igdb task done.');
}
