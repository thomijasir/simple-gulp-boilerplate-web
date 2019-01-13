var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-minify-css');
var imagemin    = require('gulp-imagemin');


// GUlP Confuguration
var config = {
    port: 3010,
    assetOut: './src/dist',
    imagesOut: './src/dist/images',
    assetIn: './src/styles/main.scss',
    imageIn: './src/assets/**/*.+(png|jpg|jpeg|gif|svg)',
    pathWatcher: './src/**',
    sassWatcher: './src/styles/**.scss',
    rootDir: './src',
};

console.log('Gulp Config: ', config)

// Compile sass into CSS & auto-inject into browsers
gulp.task('sassDev', function() {
    // SCSS DEV
    return gulp.src(config.assetIn)
    .pipe(sass())
    .pipe(gulp.dest(config.assetOut))
    .pipe(browserSync.stream());
});

gulp.task('sassBuild', function() {
    // SCSS BUILD
    return gulp.src(config.assetIn)
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.assetOut))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sassDev'], function() {
    browserSync.init({
        server: config.rootDir,
        port: config.port
    });

    gulp.watch(config.sassWatcher, ['sassDev']);
    gulp.watch(config.pathWatcher).on('change', browserSync.reload);
});
// Minify Image
gulp.task('images', function(){
    return gulp.src(config.imageIn)
    .pipe(imagemin())
    .pipe(gulp.dest(config.imagesOut))
});

gulp.task('default', ['sassDev', 'serve']);
gulp.task('build', ['sassBuild','images']);
