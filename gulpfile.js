var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;

gulp.task('default', ['npm', 'lib']);

// gulp.task('npm', function() {
//   gulp.src(['node_modules/**/*'])
//     .pipe(gulp.dest('complete/node_modules'))
//     .pipe(gulp.dest('trigger/node_modules'));
// });


var npmcmd = 'cd complete && npm install && cd ../trigger && npm install';

gulp.task('npm', function(cb){
  exec(npmcmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });  
});



gulp.task('lib', function() {
  gulp.src(['lib/**/*'])
    .pipe(gulp.dest('complete/libc'))
    .pipe(gulp.dest('trigger/libc'));
});


gulp.task('clean', function(cb){
  del(['complete/libc', 'complete/node_modules', 'trigger/libc', 'trigger/node_modules'], cb);
});

var vsixcmd = 'export LC_CTYPE=C && export LANG=C && tfx extension create --manifest-globs vss-extension.json';

gulp.task('vsix', function(cb){
  exec(vsixcmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });  
});
