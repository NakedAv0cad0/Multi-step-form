const cssnanoPlugin = require("cssnano");
const prefixsPlugin = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const typescript = require("gulp-typescript").createProject({
  declaration: false,
});
// compile sass file
function buildStyles() {
  let plugins = [prefixsPlugin(), cssnanoPlugin()];
  return src("sass/style.scss")
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write("."))
    .pipe(dest("css"));
}
// compile typescript file
function buildScripts() {
  return src("ts/**/*.ts").pipe(typescript()).pipe(dest("js"));
}
// watch function
function watchChanges() {
  watch(["sass/**/*.scss"], buildStyles);
  watch(["ts/**/*.ts"], buildScripts);
}
// export functions
exports.default = series(buildStyles, buildScripts, watchChanges);
