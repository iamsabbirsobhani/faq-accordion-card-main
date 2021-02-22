const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');

function sassTask() {
    return src('app/sass/style.scss', {sourcemaps: true})
            .pipe(sass())
            .pipe(postcss([cssnano()]))
            .pipe(dest('dist/css', {sourcemaps: '.' }))
}

function jsTask() {
    return src('app/js/sandbox.js', {sourcemaps: true})
            .pipe(terser())
            .pipe(dest('dist/js'), {sourcemaps: '.'})
}

function watchTask() {
    watch(['app/sass/style.scss', 'app/js/sandbox.js'], series(sassTask, jsTask))
}

exports.default = series(sassTask, jsTask, watchTask)