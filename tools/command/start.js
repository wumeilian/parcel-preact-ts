const shell = require('shelljs');
const chalk = require('chalk');
const REG = /^([A-Za-z\-\_\d])+$/;

module.exports = function start(){

    const moduleName = process.argv[3] || '';

    if(moduleName === '' ||  !REG.test(moduleName)){
        console.log(chalk.yellow('[warning]: Please enter a module name, which include letters, numbers, underscores and hashes.'));
        return;
    }

    shell.exec(`npm run start ${moduleName}`, function(err){
        if(err){
            console.log(chalk.red(err));
            process.exit(0);
        }
    });

}