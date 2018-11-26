const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const CURR_DIR = process.cwd();
const REG = /^([A-Za-z\-\_\d])+$/;
const log = console.log;

const question =  {
    type: 'input',
    name: 'module-name',
    message: 'Please enter a module name:',
    validate: function (input) {
        if (REG.test(input)) return true;
        else return 'Module name may only include letters, numbers, underscores and hashes.';
    },
    default: 'demo'
}

var moduleName = '';

function copyTemplateFile(targetPath, moduleName) {
    console.log(targetPath, 8888)
    const templatePath = path.join(CURR_DIR, '/template');
    const copyFile = fs.readdirSync(templatePath);
    
    copyFile.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);
        
        if(stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'UTF-8');
            const writePath = path.join(targetPath, file);
            fs.writeFileSync(writePath, contents, 'UTF-8');
        }
        else if(stats.isDirectory()) {
            const dirName = file == 'demo' ? moduleName : file
            fs.mkdirSync(`${targetPath}/${dirName}`);
           
        }
        
    })
    
    // log(chalk.green(targetPath))
}

module.exports = function(outputFile) {
    inquirer.prompt(question)
        .then(answers => {
            moduleName = answers['module-name'];
            const fileName = (outputFile && REG.test(outputFile)) ? outputFile : '';
            const targetPath = path.join(CURR_DIR, fileName);
            const ModulePath = path.join(targetPath, moduleName);
            fs.mkdirSync(targetPath, {recursive: true});
            copyTemplateFile(targetPath, moduleName)
        });

}