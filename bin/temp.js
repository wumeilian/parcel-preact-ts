#!/usr/bin/env node
// temp init -o [enter a moudule name]
// temp new [modules]
const program = require('commander');
const initial = require('../tools/command/initial');



program
    .version('1.0.0', '-v, --version')
    .usage('[command]')
    .command('init')
    .description('initialize modules')
    .option('-o, --output <fileName>', 'Add an output file')
    .action(function(options) {
        initial(options.output);
    });

program.parse(process.argv);