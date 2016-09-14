var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	jshint = require('gulp-jshint'),
	map = require('map-stream'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
	changed = require('gulp-changed'),
	runSequence = require('run-sequence'),
	postcss = require('gulp-postcss'),
	px2rem = require('postcss-px2rem'),
	plumber = require('gulp-plumber');

/**
 * Converts Sass to CSS with gulp-sass *
 * Gets all files ending with .scss in src/scss and children dirs
 */
gulp.task('sass', function(){
	var processors = [px2rem({remUnit: 75})];
	return gulp.src('src/assets/scss/*.scss')
		.pipe(changed('src', {extension: '.scss'}))
		.pipe(plumber())
		.pipe(sass())
		//.pipe(sourcemaps.init())
		// Autoprefixer only if it's a CSS file
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		//.pipe(sourcemaps.write('.'))
		// run px2rem convertion
		.pipe(postcss(processors))
		.pipe(gulp.dest('src/assets/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/**
 * jsHint
 */
var myReporter = map(function(file, cb){
	if (!file.jshint.success) {
		console.log('JSHINT fail in ' + file.path);
		file.jshint.results.forEach(function(err) {
			if (err) {
				console.log(' ' + file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
			}
		});
	}
	cb(null, file);
});

gulp.task('lint', function(){
	return gulp.src('src/assets/js/**/*.js')
		.pipe(jshint())
		.pipe(myReporter);
});

/**
 * Gulp watch syntax 
 */
gulp.task('watch', ['browserSync', 'sass', 'lint'], function(){

	// watch all Sass files and run the sass  task whenever a Sass file is saved
	gulp.watch('src/assets/scss/**/*.scss', ['sass']);

	// Reloads the browser whenever HTML or JS files change
	gulp.watch('src/**/*.html', browserSync.reload);
	gulp.watch('src/assets/js/**/*.js', browserSync.reload);
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
	return gulp.src('src/assets/imgs/**/*.+(png|jpg|jpeg|gif|svg)')
		// Caching images that ran through imagemin
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('build/assets/imgs'));
});

/**
 * Copying Fonts to Build
 */
gulp.task('fonts', function(){
	return gulp.src('src/assets/fonts/**/*')
		.pipe(gulp.dest('build/assets/fonts'));
});

/**
 * Cleaning up generated files automatically
 */
gulp.task('clean:build', function(){
	return del.sync('build');
});

// Clean src/assets/css dir
gulp.task('clean:css', function(){
	return del.sync('src/assets/css');
});

/**
 * Combining Gulp tasks
 */

// build task
gulp.task('build', function(callback){
	runSequence('clean:build',
		['sass', 'lint', 'useref', 'images', 'fonts'],
		callback
	);
});

// default task
gulp.task('default', function(callback){
	runSequence(['sass', 'lint', 'browserSync', 'watch'], callback);
});
