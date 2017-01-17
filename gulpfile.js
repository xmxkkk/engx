var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', [], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./js/*.js").on("add", browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./css/*.css").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    
});

gulp.task('default', ['serve']);