const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function cleanDist() {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
}

function copyHtml() {
    return gulp.src('./public/index.html').pipe(
        gulp.dest('./dist')
    );
}

function copyCss() {
    return gulp.src('src/**/*.css')
        .pipe(concat('all.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
}

function copyJs() {
    return gulp.src('src/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/scripts'));
}

module.exports = {
    build: gulp.series(cleanDist, gulp.series(copyHtml,copyCss,copyJs)),
};
