var gulp = require('gulp');
//var less = require('gulp-less');
//var plumber = require("gulp-plumber");
//var postcss = require("gulp-postcss");
//var autoprefixer = require("autoprefixer");
//var server = require("browser-sync");
var rename = require('gulp-rename');
//var mqpacker = require('css-mqpacker');
//var minify = require('gulp-csso');
//var imagemin = require('gulp-imagemin');
//var svgstore = require('gulp-svgstore');
//var svgmin = require('gulp-svgmin');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');

gulp.task('style', function() {
	gulp.src('less/style.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer({browsers: [
				"last 2 version",
				"last 2 Chrome version",
				"last 2 Firefox version",
				"last 2 Opera version",
				"last 2 Edge version",
				"last 2 ie version"
			]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(gulp.dest('css'))
		
		//.pipe(server.reload({stream: true}));
});

gulp.task('server', ["style"], function() {
	server.init({
		server: '.'
	});

	gulp.watch('less/**/*.less', ['style'])
		.on('change', server.reload);
	gulp.watch('*.html')
		.on('change', server.reload);
	gulp.watch('js/**/*.js')
		.on('change', server.reload);

});

gulp.task('stylemin', function() {
	gulp.src('css/style.css')		
		.pipe(gulp.dest('css'))
		.pipe(cssmin())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('styleprintmin', function() {
	gulp.src('css/print.css')		
		.pipe(gulp.dest('css'))
		.pipe(cssmin())
		.pipe(rename('print.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('stylemobilemin', function() {
	gulp.src('css/mobile.css')		
		.pipe(gulp.dest('css'))
		.pipe(cssmin())
		.pipe(rename('mobile.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('htmlmin', function() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(''));
});

gulp.task('images', function(){
	return gulp.src('img/**/*.{png,jpg,gif}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({prograssive: true})
		]))
		.pipe(gulp.dest('img'));
});

