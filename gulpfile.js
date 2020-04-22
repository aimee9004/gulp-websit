const gulp = require('gulp')
// 模板引入
const fileInclude = require('gulp-file-include')
// scss
const sass = require('gulp-sass')
// 自动补全
const autoprefixer = require('gulp-autoprefixer')
// 合并文件
const concat = require('gulp-concat')
// html美化基于js-beautify
const htmlBeautify = require('gulp-html-beautify')
// html压缩
const htmlmin = require('gulp-htmlmin')
// 图片压缩

gulp.task('fileInclude', () => {
    return gulp.src(['./src/views/*.html'])
        .pipe(fileInclude({
            prefix: '@@', //变量前缀 @@include
            basepath: '@file', //引用文件路径
            indent: true
        }))
        .pipe(gulp.dest('./dist/'))
})
 
gulp.task('htmlBeautify', ['fileInclude'], () => {
    const options = {
        "indent_size": 4,
        "indent_char": " ",
        "eol": "\n",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "jslint_happy": false,
        "space_after_anon_function": false,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "break_chained_methods": false,
        "eval_code": false,
        "unescape_strings": false,
        "wrap_line_length": 0,
        "wrap_attributes": "auto",
        "wrap_attributes_indent_size": 4,
        "end_with_newline": false
    }
    return gulp.src('./dist/*.html')
        .pipe(htmlBeautify())
        .pipe(gulp.dest('./dist/'))
})

gulp.task('htmlmin', ['fileInclude'], () => {
    const options = {
        removeComments: true, //清除HTML注释
        // collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    }
    return gulp.src('./dist/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('scss', () => {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Firefox >= 20'],
            cascade: false
        }))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('dev', () => {
    gulp.watch('./src/scss/*.scss', ['scss'])
    gulp.watch('./src/**/*.html', ['htmlmin'])
})