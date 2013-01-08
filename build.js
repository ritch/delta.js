var sh = require('shelljs');

sh.exec('browserify lib/index.js -v -o builds/delta.js');