var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var _ = require('lodash');
var combiner = require('stream-combiner2');
var minifyCss = require('gulp-clean-css');
var series = require('stream-series');
var sourcemaps = require('gulp-sourcemaps');
var flatten = require('gulp-flatten');
var bower = require('gulp-bower');

var fontsSrc = [
    './src/assets/fonts/**/*'
];

var imagesSrc = [
    './src/assets/images/**/*'
];

var jsSources = [
    './src/*/*.js'
];

var libJS = [
    './libs/jquery/dist/jquery.js'
];

var templatesHTML = [
    './src/**/*.html',
    '!./src/index.html'
];

gulp.task('serve', function (done) {
    runSequence('build', 'browserSync', 'watch',  done);
});

gulp.task('build', function (done) {
    runSequence('clean', 'distJS', 'templates', 'sass', 'fonts', 'images', 'index',  done);
});

gulp.task('libs', function (done) {
    runSequence('removeLibs', 'bower',  done);
});

gulp.task('distJS', ['appJS', 'libJS']);

gulp.task('bower', function() {
    return bower('./libs')
});

gulp.task('removeLibs', function () {
    del.sync([
        'libs'
    ]);
});

gulp.task('appJS', function () {
    var wrap = require("gulp-wrap");
    return series(gulp.src(jsSources))
        .pipe(processJS('app.min.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('libJS', function () {
    return gulp.src(libJS)
        .pipe(processJS('libs.min.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('templates', function () {
    return gulp.src(templatesHTML)
        .pipe(flatten())
        .pipe(gulp.dest("./build/templates"));
});

gulp.task('clean', function () {
    del.sync([
        'build'
    ]);
});

gulp.task('sass', function () {
    return gulp.src('./src/index.scss')
        .pipe(sass())
        .pipe(processCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'));

    function processCss() {
        return combiner.obj([
            minifyCss(),
            rename('styles.min.css')
        ]);
    }
});

gulp.task('fonts', function () {
    return gulp.src(fontsSrc)
        .pipe(gulp.dest('./build/assets/fonts'));
});

gulp.task('images', function () {
    return gulp.src(imagesSrc)
    .pipe(gulp.dest('./build/assets/images'));
});

gulp.task('index', function () {
    var distCss = gulp.src(['./build/*.css']);
    var distJS = gulp.src(['./build/js/libs.min.js', './build/js/app.min.js']);

    return gulp.src('./src/index.html')
        .pipe(inject(distJS, {
            ignorePath: 'build'
        }))
        .pipe(inject(distCss, {
            ignorePath: 'build'
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server : {
            baseDir : './build'
        },
        https : true,
        notify : {
            styles : [
                "display: none",
                "padding: 15px",
                "font-family: sans-serif",
                "position: fixed",
                "font-size: 0.9em",
                "z-index: 9999",
                "bottom: 0px",
                "right: 0px",
                "border-bottom-left-radius: 5px",
                "background-color: #1B2032",
                "margin: 0",
                "color: white",
                "text-align: center"
            ]
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/**/*.html', ['templates']);
    gulp.watch('src/**/*.js', function () {
        runSequence('appJS', 'index');
        runSequence('appJS', 'index');
    });
    gulp.watch([
        'src/**/*.scss',
        'src/**/*.css'
    ], ['sass']);

    gulp.watch('build/**/*.js', _.debounce(browserSync.reload));
    gulp.watch('build/index.html', _.debounce(browserSync.reload));
});


function processJS(finalName) {
    return combiner.obj([
        concat(finalName),
        uglify()
    ]);
}