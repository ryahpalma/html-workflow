// Load Plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();
// Static Server
function browserSync() {
        browsersync.init({
          server: {
            baseDir: "."
          }
        });
}
// BrowserSync Reload
function browserSyncReload() {
    browsersync.reload();
}
// Watch Files
function watchFiles() {
// If you need to change your directory, change the values below "new_directory/*.scss"
    gulp.watch("scss/*.scss", scss); // Watch and build CSS file
    gulp.watch("*.html").on('change', browserSyncReload); // Reload when HTML is changed
}
// Compile SCSS into CSS & auto-inject into browsers
function scss() {
// If you need to change your directory, change the values below "new_directory/*.scss"
    return gulp.src('scss/*.scss') // Folder directory and file extension
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError)) // In OutputStyle select if you want compact,expanded,nested or compressed
        .pipe(rename({suffix:'.min'})) // Rename compressed CSS
        .pipe(gulp.dest('assets/css')) // Select the directory for the CSS file "new_directory/css"
        .pipe(browsersync.stream());
}
// Define Complex Tasks
const build = gulp.series(gulp.parallel(scss));
const start = gulp.parallel(watchFiles, browserSync);
//Export Tasks
exports.scss = scss;
exports.start = start;
exports.build = build; 
exports.default = start; // Initialize all tasks
