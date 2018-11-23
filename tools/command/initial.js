const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const CURR_DIR = process.cwd();

const question = {
    type: 'input',
    name: 'module-name',
    message: 'Please enter a module name:',
    validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Module name may only include letters, numbers, underscores and hashes.';
    },
    default: 'demo'
}

var moduleName = '';

function copyTemplateFile(templatePath, targetPath) {

}

module.exports = function() {
    inquirer.prompt(question)
        .then(answers => {
            console.log(answers, 88)
            moduleName = answers['module-name'];
            console.log(CURR_DIR, 99);
            // const templatePath = 
            // fs.mkdirSync(`${CURR_DIR}/modules/${moduleName}`, {recursive: true});
            
        });

}