const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');
const shell = require('shelljs');
const log = console.log;
const REG = /^([A-Za-z\-\_\d])+$/;


const resolve = (...dir) => path.resolve(__dirname, '..', ...dir);

const MODULE = process.argv[2] || '';
const modulePath = resolve(`modules/${MODULE}`); // 要监听的模块路径

if(MODULE === '' ||  !REG.test(MODULE)){
    log(chalk.yellow('[warning]: Please enter a module name, which include letters, numbers, underscores and hashes.'));
    process.exit();
}

if(!fs.existsSync(modulePath)) {
    log(chalk.yellow(`[Warn] ${modulePath} is not exist, you can run "temp new ${MODULE}" to create.`));
    process.exit();
}


// 入口文件路径
const inputFile = path.resolve(__dirname, `../modules/${MODULE}/index.html`);
const outputFile = path.resolve(__dirname, `../dist/${MODULE}`)

require('./parcel.config')
// shell.exec(`parcel serve ${inputFile} -d dist/${MODULE} -p 8888 --open`, data => {
   
//     if (data) {
//         console.error(`执行出错: ${data}`);
//         return;
//       }
//       console.log(`error: ${data}`);
// })

// const serveP = exec(`parcl serve ${inputFile} -d dist/${MODULE} -p 8888 --open`);
// serveP.stdout.on('data', stats => {
//     console.log(stats, 999)
// })

// exec(`parcel serve ${inputFile} -d dist/${MODULE} -p 8888 --open`,  (error, stdout, stderr) => {
//     if (error) {
//         console.error(`执行出错: ${error}`);
//         // return;
//       }
//       console.log(`stdout: ${stdout}`);
//       console.log(`stderr: ${stderr}`);
// })