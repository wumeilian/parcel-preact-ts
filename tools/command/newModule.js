const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const CURR_DIR = process.cwd();
const log = console.log;

const REG = /^([A-Za-z\-\_\d])+$/;
const moduleName = process.argv[3] || '';

function newModule() {
    if(!REG.test(moduleName)) {
        log(chalk.red('Module name may only include letters, numbers, underscores and hashes.'))
        return;
    }

    let targetPath = path.resolve(`modules/${moduleName}`, 'index.html');
    if(fs.existsSync(targetPath)) {
        log(chalk.red('The module already existed, please new a special module.'))
        return;
    }

    
    log(targetPath, 888)

}


module.exports = newModule;
