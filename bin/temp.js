#!/usr/bin/env node
// temp init
// temp new [module]
const program = require('commander');
const initial = require('../tools/command/initial');
const newModule =  require('../tools/command/newModule');


// 创建工程
program
    .version('1.0.0', '-v, --version')
    .usage('[command]')
    .command('init')
    .description('initialize project')
    .action(initial);

// 新建模块
program
    .command('new <moduleName>')
    .description('creat a new module')
    .action(newModule);
    
program.parse(process.argv);