const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps")


gulp.task("babel", done => {
    gulp.src("js/*.js").pipe(babel({
        presets: ['@babel/preset-env']
    })).pipe(gulp.dest("dist/js"))
    done();
})
gulp.task("copyHtml", done => {
    gulp.src("html/*.html !index.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
    done();
})
gulp.task("copyIndex", done => {
    gulp.src("html/index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
    done();
})
gulp.task("copyImg", done => {
    gulp.src("img/**").pipe(gulp.dest("dist/img")).pipe(connect.reload());
    done();
})

gulp.task("copyScss", done => {
    gulp.src("sass/*.scss").pipe(sourcemaps.init()).pipe(sass()).pipe(sourcemaps.write()).pipe(gulp.dest("dist/css")).pipe(connect.reload());
    done();
})
gulp.task("watch", done => {
    gulp.watch("html/index.html", gulp.series("copyIndex"));
    gulp.watch("html/*.html", gulp.series("copyHtml"));
    gulp.watch("img/**", gulp.series("copyImg"));
    gulp.watch("sass/*.scss", gulp.series("copyScss"));
    gulp.watch("js/*.js", gulp.series("babel"));
    done();
})
gulp.task("bulid", gulp.series("copyIndex", "copyHtml", "copyImg", "copyScss", "babel"))
gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: true
    })
    done();

})
gulp.task("default", gulp.parallel("bulid", "watch", "server"));