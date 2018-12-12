// const fs = require('fs');
// const path = require('path');
// const chalk = require('chalk');
// const log = console.log;
// const REG = /^([A-Za-z\-\_\d])+$/;


// const resolve = (...dir) => path.resolve(__dirname, '..', ...dir);

// const MODULE = process.argv[2] || '';
// const modulePath = resolve(`modules/${MODULE}`); // 要构建的模块路径

// if(MODULE === '' ||  !REG.test(MODULE)){
//     log(chalk.yellow('[warning]: Please enter a module name, which include letters, numbers, underscores and hashes.'));
//     process.exit();
// }

// if(!fs.existsSync(modulePath)) {
//     log(chalk.yellow(`[Warn] ${modulePath} is not exist, you can run "temp new ${MODULE}" to create.`));
//     process.exit();
// }

// const start = require('./parcel.config');
// start();

const { promisify } = require('util');
const fs = require('fs');
const cp = require('child_process');

const exec = promisify(cp.exec);
const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

const now = new Date;
const projectName = 'sugges';
const publicUrl = 'https://static.seeyouyima.com/news-node.seeyouyima.com/';

const timestamp = now.getTime();
const zipName = `${projectName}-${timestamp}.zip`;

const call = cmd => {
  console.log(`exec: ${cmd}`);
  return exec(cmd);
};

const build = async () => {
  // await call(`node_modules/.bin/parcel build src/index.html --public-url=${publicUrl} --no-source-maps`);

  /**
  const urlRE = /url\(([^\)]+)\)/ig;
  for (let df of await readdir('dist')) {
    if (df.endsWith('.css')) {
      const cf = `dist/${df}`;
      const nc = (await read(cf, 'utf8')).replace(urlRE, (_m, m0) => `url(${publicUrl}${m0})`);
      await write(cf, nc);
    }
  }
  */
};


const zip = async () => {
  const buildAt = now.toLocaleString();
  const config = {
    [projectName]: {
      // api: 'https://circle.seeyouyima.com/v2/search_suggest',
      buildAt,
      index: 'index.html'
    }
  };

  await write('dist/config.json', JSON.stringify(config, null, 2));
  await call(`cd dist && zip -qr ${zipName} . && cd -`);
};


(async () => {

await call('rm -rf dist/');
await call(`node_modules/.bin/parcel build src/index.html --public-url=${publicUrl} --no-source-maps`);
await call('cp dist/index.html .');
await zip();
await call(
  `qshell qupload2 \
    -src-dir dist \
    -bucket static \
    -key-prefix news-node.seeyouyima.com/ \
    -overwrite \
    -check-exists \
    -check-hash \
    -rescan-local`
);

await call(
  `curl 'https://test-admin-content.seeyouyima.com/operation/h5_source_operate' \
    -H 'content-type: application/x-www-form-urlencoded' \
    -H 'cookie: PHPSESSID=194c266c1e8d40229058bad5c073d016;' \
    --data 'module_id=27&app_id=1&platform_id=0&app_version_min=7.1&app_version_max=9.9&source_version=template&source_url=https%3A%2F%2Fstatic.seeyouyima.com%2Fnews-node.seeyouyima.com%2Fsugges-${timestamp}.zip&pattern=mywtb_name%3Dsearch-home&ab_ratio=0&id=37' \
    --compressed`);


console.log(`tmpl: ${publicUrl}${zipName}`);

})()

.catch(ex => console.error(ex));



// proxy api

// https://github.com/parcel-bundler/parcel/issues/55