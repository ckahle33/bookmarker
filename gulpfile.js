/**
 * Created by cpk on 5/20/15.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('public/css/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function () {
    gulp.watch('public/css/sass/*.scss', ['sass']);
});