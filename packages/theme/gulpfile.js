/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-14 20:40:54
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-14 20:57:14
 */
const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
// const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');



function compile() {
    return src('./src/*.scss')
      .pipe(sass.sync())
    //   .pipe(cssmin())
      .pipe(dest('./lib'));
}

function copyfont() {
    return src('./src/fonts/**')
    //   .pipe(cssmin())
      .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);