var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var pngquant = require('node-pngquant-native');
var path = require('path');

function yspng(opt) {
    // speed: 11, //1 ~ 11
    // quality: [40, 60]
    var n_opt = opt || {};

    // 创建一个让每个文件通过的 stream 通道
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            // 返回空文件
            cb(null, file);
        }
        if (file.isBuffer() && path.extname(file.path) == '.png') {
            var buffer = new Buffer(file.contents);
            file.contents = pngquant.compress(buffer, n_opt);
        }
        if (file.isStream()) {
            cb(null, file);
            file.contents = file.contents.pipe(yspng.stream(n_opt));
        }
        cb(null, file);
    });
};
yspng.stream = function(opt) {
    var n_opt = opt || {};
    var stream = through(function(buf, enc, next) {
        next(null, pngquant.compress(buf, n_opt))
    });
    return stream;
}
module.exports = yspng;
