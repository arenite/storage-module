/*global require:true */
(function () {
  'use strict';
  var gulp = require('gulp');
  var uglify = require('gulp-uglify');
  var jshint = require('gulp-jshint');
  var concat = require('gulp-concat');
  var minifyCSS = require('gulp-minify-css');
  var arenitesrc = require('gulp-arenite-src');
  var shell = require('gulp-shell');

  var build = 'build/';

  gulp.task('storagejsdocs', function () {
    return gulp.src('gulpfile.js', {read: false})
      .pipe(shell('node_modules/docco/bin/docco -o docs storagejs/**/*.js'));
  });

  gulp.task('storagejsmin', function () {
    arenitesrc({
        mode: 'dev',
        base: 'storagejs/'
      },
      {
        export: 'arenite',
        imports: {module: {module: ''}}
      }, function (src) {
        src
          .pipe(concat('storagejs.min.js'))
          .pipe(uglify({preserveComments: 'some'}))
          .pipe(gulp.dest('storagejs/' + build));
      });
  });

  gulp.task('default', ['storagejsmin', 'storagejsdocs']);

  gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['storagejsmin', 'storagejsdocs']);
  });
}());
