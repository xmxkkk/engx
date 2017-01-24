var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var babel 		= require('gulp-babel');
var gulpPlugin  = require('gulp-load-plugins')();
// Static Server + watching scss/html files

gulp.task("babel",function(){
	return gulp.src('src/*.js').pipe(gulpPlugin.babel({
		presets:['es2015']
	})).pipe(gulp.dest('dist/'));
});
gulp.task('watch',['babel'],function(){
	gulp.watch(['src/*.js'],['babel']);
});
gulp.task('serve', [], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./src/*.js").on("add", browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./css/*.css").on('change', browserSync.reload);
    gulp.watch("./src/*.js").on('change', browserSync.reload);

});

gulp.task('default', ['serve','watch']);
