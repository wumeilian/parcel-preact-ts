#!/usr/bin/env node
// temp init
// temp new [module]
// temp start <muduleName> / npm start <muduleName>
const program = require('commander');
const initial = require('../tools/command/initial');
const newModule =  require('../tools/command/newModule');
const startModule = require('../tools/command/startModule');


// 创建工程
program
    .version('1.0.0', '-v, --version')
    .usage('[command]')
    .command('init')
    .description('initialize project')
    .action(test);

// 新建模块
program
    .command('new <moduleName>')
    .description('creat a new module')
    .action(newModule);

program
    .command('start [moduleName]')
    .description('start a module')
    .action(startModule);

program.parse(process.argv);

function test(main, command) {
    console.log(main, 9999)
    console.log(command, 888)
    console.log(command.name(), 77)
}