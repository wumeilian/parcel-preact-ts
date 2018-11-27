const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const CURR_DIR = process.cwd();
const REG = /^([A-Za-z\-\_\d])+$/;
const log = console.log;

const question =  {
    type: 'input',
    name: 'project-name',
    message: 'Please enter a project name:',
    validate: function (input) {
        if (REG.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
    default: 'modules'
}

var projectName = '';

function copyTemplateFile(templatePath, targetPath) {    
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
            fs.mkdirSync(`${targetPath}/${file}`);
            copyTemplateFile(`${templatePath}/${file}`, `${targetPath}/${file}`);
        }
    });
}

function logInfo () {
    figlet('Temp CLI', function(err, data) {
        if(err){
            log(chalk.red('Some thing about figlet is wrong!'));
        }

        log(chalk.blue(data));
        log(chalk.green(`   [√ Success] Project ${projectName} init finished!`));
        log();
        log('   Install dependencies:');
        log(chalk.magenta(`     cd ${projectName} && npm install`));
        log();
        log('   Run the project:');
        log(chalk.magenta('     temp start demo'));
    });
}

module.exports = function() {
    inquirer.prompt(question)
        .then(answers => {
            projectName = answers['project-name'];

            const targetPath = path.join(CURR_DIR, projectName);
            const templatePath = path.join(__dirname,'../../','template'); // 模板目录

            fs.mkdirSync(targetPath);  // 创建工程名称

            setTimeout(()=>logInfo(),1000);

            copyTemplateFile(templatePath, targetPath)
        });

}