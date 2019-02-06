var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(); // we only need 1 method of this pkg

gulp.task('watch', function(){

  console.log("Running browserSync.init()");
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function(){
    // gulp.start('html');
    console.log("Running browserSync.reload()");
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function(){
    // gulp.start('styles');
    console.log("Starting cssInject()");
    gulp.start('cssInject');
  });

});

gulp.task('cssInject', ['styles'], function() {
  console.log("Entered task cssInject");
  console.log("Loading temp/styles/styles.css into browserSync.stream()");
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});


