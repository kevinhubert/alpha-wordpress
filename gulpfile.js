/// <binding AfterBuild='moveToLibs' />
var gulp            = require('gulp'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),

    themeName       = "THEME-NAME-HERE";

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "local." + themeName
    });

    gulp.watch("wp-content/themes/" + themeName + "/styles/*.scss", ['sass']);
    gulp.watch("wp-content/themes/" + themeName + "/styles/*/*.scss", ['sass']);
    gulp.watch("wp-content/themes/" + themeName + "/*.php").on('change', browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {

    var processors = [
    autoprefixer
    ];
    return gulp.src("wp-content/themes/" + themeName + "/styles/styles.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest("wp-content/themes/" + themeName + "/styles"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
