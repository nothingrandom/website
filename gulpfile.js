var gulp = require('gulp'),
	//coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	sourcemaps = require('gulp-sourcemaps'),
	changed = require('gulp-changed'),
	compass = require('gulp-compass'),
	hogan = require('gulp-hogan-compile');

var paths = {
	scripts: 'assets/js/**/*.js',
	images: 'assets/images/**/*',
	stylesheets: 'assets/css/**/*.scss'
	//templates: 'html/assets/templates/**/*.html'
};

gulp.task('javascript', function() {
	return gulp.src('assets/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('scripts', ['javascript'], function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			//.pipe(coffee())
			.pipe(uglify())
			.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('build/js'));
});

gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(changed('images'))
		.pipe(imagemin())
		.pipe(gulp.dest('images'));
});

gulp.task('stylesheets', function() {
	return gulp.src(paths.stylesheets)
		.pipe(sourcemaps.init())
			.pipe(compass({
				css: 'build/css',
				sass: 'assets/css',
				style: 'compressed',
				comments: 'false'
			}))
		.pipe(sourcemaps.write('../maps'));
});

// gulp.task('templates', function() {
// 	return gulp.src(paths.templates)
// 		.pipe(hogan('templates.js', {
// 			wrapper: false
// 		}))
// 		.pipe(gulp.dest('html/build/js'));
// });

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.stylesheets, ['stylesheets']);
	//gulp.watch(paths.templates, ['templates']);
});

gulp.task('default', ['scripts', 'images', 'stylesheets', 'watch']);