const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;
const REG = /^([A-Za-z\-\_\d])+$/;
const options = require('./parcel.config');

const resolve = (...dir) => path.resolve(__dirname, '..', ...dir);

const MODULE = process.argv[2] || '';
const modulePath = resolve(`modules/${MODULE}`); // 要监听的模块路径

if(MODULE === '' ||  !REG.test(MODULE)){
    log(chalk.yellow('[warning]: Please enter a module name, which include letters, numbers, underscores and hashes.'));
    return;
}

if(!fs.existsSync(modulePath)) {
    log(chalk.yellow(`[Warn] ${modulePath} is not exist, you can run "temp new ${MODULE}" to create.`));
    return;
}

