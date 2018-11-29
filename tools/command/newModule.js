const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
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

    const tempPath = path.join(__dirname,'../../','template/modules/demo');
    const newPath = path.resolve(`modules/${moduleName}`); 
    fs.mkdirSync(newPath);

    copyModules(tempPath, newPath);

}

function copyModules(tempPath, newPath) {
    const files = fs.readdirSync(tempPath);
    files.forEach(file => {
        const orignFilePath = `${tempPath}/${file}`;
        const stats = fs.statSync(orignFilePath);

        if(stats.isFile()) {
            const contents = fs.readFileSync(orignFilePath, 'UTF-8');
            const writePath = path.join(newPath, file);
            fs.writeFileSync(writePath, contents, 'UTF-8');
            log(chalk.green(`创建： ${writePath}`))
        }
        else if(stats.isDirectory()) {
            const newPathDir = path.join(`${newPath}/${file}`);
            fs.mkdirSync(newPathDir);
            log(chalk.green(`创建： ${newPathDir}`))
            copyModules(`${tempPath}/${file}`, `${newPathDir}`);
        }
    });
}

module.exports = newModule;
