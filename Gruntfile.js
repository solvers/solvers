var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var path = require('path');
var binPath = phantomjs.path;

var appPath = './';

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.registerTask('test', 'Run Phantom tests', function() {
    var done = this.async();
    var childArgs = [
      path.join(appPath + '/test/phantom.js'),
      'http://localhost:3000'
    ];
    //NOTE: to make it fail, do this:
    //grunt.log.writeln().fail('Aborted due to warnings.');
    //process.exit(typeof errcode === 'number' ? errcode : fail.code.WARNING);
    var p = childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      grunt.log.write(stdout);
    });
    p.addListener("exit", function (code) {
      //grunt.log.write("Finished with code: "+code);
      done(code === 0);
    });

  });

  grunt.registerTask('default', ['test']);
};