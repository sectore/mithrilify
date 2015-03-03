'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  watch: ['./gulpfile.js', './lib/**', './test/**/*.spec.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.spec.js', '!test/{temp,temp/**}']
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber())
    .pipe(plugins.jscs({}))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function () {
  gulp.src(paths.tests, {cwd: __dirname})
    .pipe(plugins.plumber())
    .pipe(plugins.mocha({ reporter: 'list' }));
});

gulp.task('bump', ['test'], function () {
  var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(plugins.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint', 'mocha']);

gulp.task('release', ['bump']);

gulp.task('default', ['test']);
