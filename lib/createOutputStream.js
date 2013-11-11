var es = require('event-stream');
var path = require('path');
var mkdirp = require('mkdirp');
var writeFile = require('./writeFile');
var writeDir = require('./writeDir');

module.exports = function(folder, opt) {
  if (!opt) opt = {};

  folder = path.resolve(folder);

  function saveFile (file, cb) {
    var writePath = path.join(folder, file.shortened);
    var writeFolder = path.dirname(writePath);

    mkdirp(writeFolder, function(err){
      if (err) return cb(err);
      if (!file.stat || file.stat.isDirectory()) {
        writeDir(writePath, file, cb);
      } else {
        writeFile(writePath, file, cb);
      }
    });
  }
  var stream = es.map(saveFile);
  return stream;
};