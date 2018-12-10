const Bundler = require('parcel-bundler');
const Path = require('path');
const { exec } = require('child_process');
const MODULE = process.argv[2] || '';
const CLI = process.argv[1];
const serve = CLI.indexOf(Path.join('tools', 'start'));
const build = CLI.indexOf(Path.join('tools', 'build'));


// 入口文件路径
const file = Path.resolve(__dirname, `../modules/${MODULE}/index.html`);

// Bundler 选项
const options = {
    outDir: `dist/${MODULE}`, // 将生成的文件放入输出目录下，默认为 dist
    // outFile: 'index.html', // 输出文件的名称
    // publicUrl: './', // 静态资源的 url ，默认为 dist
    watch: true, // 是否需要监听文件并在发生改变时重新编译它们，默认为 process.env.NODE_ENV !== 'production'
    cache: false, // 启用或禁用缓存，默认为 true
    cacheDir: '.cache', // 存放缓存的目录，默认为 .cache
    minify: true, // 压缩文件，当 process.env.NODE_ENV === 'production' 时，会启用
    target: 'browser', // 浏览器/node/electron, 默认为 browser
    https: false, // 服务器文件使用 https 或者 http，默认为 false
    logLevel: 3, // 3 = 输出所有内容，2 = 输出警告和错误, 1 = 输出错误
    hmrPort: 0, // hmr socket 运行的端口，默认为随机空闲端口(在 Node.js 中，0 会被解析为随机空闲端口)
    sourceMaps: false, // 启用或禁用 sourcemaps，默认为启用(在精简版本中不支持)
    hmrHostname: '', // 热模块重载的主机名，默认为 ''
    detailedReport: build > -1 ? true : false, // 打印 bundles、资源、文件大小和使用时间的详细报告，默认为 false，只有在禁用监听状态时才打印报告
    open: true,
    port: 8888,
  };
  

const runBundle = async () => {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(file, options);
  if (serve > -1 && options.open) {
    const server = await bundler.serve(options.port);
    if (server) {
        await require('parcel-bundler/src/utils/openInBrowser')(`http://localhost:${options.port}`, true)
    }
  } else {
    exec(`rm -rf ${Path.join(__dirname, './dist')}`);
    bundler.bundle();
  }
};



module.exports = runBundle;