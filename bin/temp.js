#!/usr/bin/env node
// temp init
// temp new [module]
// temp start <muduleName> | npm start <muduleName>
// temp build <moduleName> | npm build <muduleName>
const program = require('commander');
const initial = require('../tools/command/initial');
const create =  require('../tools/command/create');
const start = require('../tools/command/start');
const build = require('../tools/command/build');

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
    .action(create);

// 启动模块
program
    .command('start [moduleName]')
    .description('start a module')
    .action(start);

// 构建模块    
program
    .command('build [moduleName]')
    .description('build a module')
    .action(build);

program.parse(process.argv);