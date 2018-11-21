#!/usr/bin/env node
// temp init  [enter a moudule name]
// temp new [modules]
const program = require('commander');
const initial = require('../tools/command/initial');



program
    .version('1.0.0', '-v, --version')
    .usage('[command]')
    .command('init')
    .description('initialize modules')
    .action(initial);

program.parse(process.argv);