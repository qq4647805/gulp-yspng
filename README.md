# gulp-yspng
### gulp插件 压缩png图片

####[github : https://github.com/qq4647805/gulp-yspng](https://github.com/qq4647805/gulp-yspng)

> 参考 [node-pngquant-native](https://www.npmjs.com/package/node-pngquant-native)

```javascript
var yspng = require('gulp-yspng');

gulp.task('yspng', function() {
  gulp.src(["images/**/*.png"])
    .pipe(yspng({
       speed: 3, //1 ~ 11
      // quality: [40, 60]
    }))
    .pipe(gulp.dest("dist/images"))
});
