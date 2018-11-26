const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;

const resolve = (...dir) => path.resolve(__dirname, '..', ...dir);

const MODULE = process.argv[2] || '';
const modulePath = resolve(`modules/${MODULE}`); // 要创建的模块路径


createModule();

function createModule() {

    if(MODULE == '') {
        log(chalk.red('[warn] Please enter a module name'));
        return
    }

    if(!fs.existsSync(modulePath)) { // 不存在该模块
        log(chalk.green('[Info] Static modules begin creating……'));
        createDir();
        createDir('js');
        createDir('css');
        createDir('images');
        createFiles();

    }else {
        log(chalk.yellow(`[Fail] ${modulePath} already exists`));
    }
}


function createDir(dirname = '') {
    let pathDir = resolve(modulePath, dirname);
    fs.mkdirSync(pathDir, {recursive: true});
    console.log(chalk.green(`   + ${pathDir}`));
}

function createFiles() {
    let htmlFile = resolve(modulePath, 'index.html');
    let jsFile = resolve(modulePath, 'js', 'index.tsx');
    let cssFile = resolve(modulePath, 'css', 'index.scss');

    fs.writeFileSync(htmlFile, '','utf8');
    fs.writeFileSync(jsFile, '','utf8');
    fs.writeFileSync(cssFile, '','utf8');

    log(chalk.green(`   + ${htmlFile}`));
    log(chalk.green(`   + ${jsFile}`));
    log(chalk.green(`   + ${cssFile}`) + '\n');
}