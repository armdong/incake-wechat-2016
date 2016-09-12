var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
	runSequence = require('gun-sequence');

/**
 * Converts Sass to CSS with gulp-sass *
 * Gets all files ending with .scss in src/scss and children dirs
 */
gulp.task('sass', function(){
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/**
 * Gulp watch syntax 
 */
gulp.task('watch', ['browserSync', 'sass'], function(){

	// watch all Sass files and run the sass  task whenever a Sass file is saved
	gulp.watch('src/scss/**/*.scss', ['sass']);

	// Reloads the browser whenever HTML or JS files change
	gulp.watch('src/**/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

/**
 * Live-reloading with Browser Sync
 * We need to create a browserSync task to enable Gulp to spin up a server using Browser Sync.
 * Since we're running a server, we need to let Browser Sync know where the root of the server should be.
 * In our case, it's the 'src' folder.
 */
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});
});


/**
 * ====================================
 * Optmizing CSS and JavaScript files
 * ====================================
 */
gulp.task('useref', function(){
	return gulp.src('src/**/*.html')
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('build'));
});

/**
 * Optmizing Images
 */
gulp.task('images', function(){
	return gulp.src('src/imgs/**/*.+(png|jpg|jpeg|gif|svg)')
		// Caching images that ran through imagemin
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('build/imgs'));
});

/**
 * Copying Fonts to Build
 */
gulp.task('fonts', function(){
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'));
});

/**
 * Cleaning up generated files automatically
 */
gulp.task('clean:build', function(){
	return del.sync('build');
});


/**
 * Combining Gulp tasks
 */

// build task
gulp.task('build', function(callback){
	runSequence('clean:build',
		['sass', 'useref', 'images', 'fonts'],
		callback
	);
});

// default task
gulp.task('default', function(callback){
	runSequence(['sass', 'browserSync', 'watch'], callback);
});
