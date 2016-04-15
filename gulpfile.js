/// <binding AfterBuild='moveToLibs' />
var gulp            = require('gulp'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),

    // CHANGE THEME NAME FOR BROWSERSYNC PROXY
    themeName       = "THEME-NAME-HERE";

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: themeName
    });

    gulp.watch("assets/styles/styles.scss", ['sass']);
    gulp.watch("assets/styles/*/*.scss", ['sass']);
    gulp.watch("assets/styles/*/*/*.scss", ['sass']);
    gulp.watch("/*.php").on('change', browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {

    var processors = [
    autoprefixer
    ];
    return gulp.src("assets/styles/styles.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest("styles"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
