// Includes.
var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jade = require('gulp-jade'),
  serve = require('gulp-serve'),
  browserSync = require('browser-sync').create();

// Check for errors in our js.
gulp.task('lint', function() {
  return gulp.src('src/js/[^_]*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile jade.
gulp.task('jade', function() {
  return gulp.src('src/jade/[^_]*.jade')
    .pipe(jade())
    .pipe(gulp.dest('app/'));
})

// Compile sass.
gulp.task('sass', function() {
  return gulp.src('src/scss/[^_]*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

// Minify all js files.
gulp.task('minify', ['lint'], function() {
  return gulp.src('src/js/[^_]*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

// Minify before reloading browsers.
gulp.task('js-watch', ['minify'], browserSync.reload);

// Compile jade pages before reloading browsers.
gulp.task('jade-watch', ['jade'], browserSync.reload);

// Sync changes with local server.
gulp.task('browser-sync', ['sass', 'jade', 'minify'], function() {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
  gulp.watch("src/js/*.js", ['js-watch']);
  gulp.watch("src/jade/*.jade", ['jade-watch']);
  gulp.watch("src/scss/*.scss", ['sass']);
});

// Default task.
gulp.task('default', ['browser-sync']);
