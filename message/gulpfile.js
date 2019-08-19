/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-19 14:34:19
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-19 14:37:23
 */
const { series, src, dest } = require('gulp');
var uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');

function compileCss() {
    return src('./src/*.css')
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

exports.build = compileCss()