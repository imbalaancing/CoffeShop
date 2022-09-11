const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const del = require("del");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const newer = require("gulp-newer");
const uglify = require("gulp-uglify");

const paths = {
  styles: {
    src: "src/styles/**/*.scss",
    dest: "build/styles/",
  },
  html: {
    src: "src/*.html",
    dest: "build/",
  },
  fonts: {
    src: "src/fonts/**",
    dest: "build/fonts/",
  },
  images: {
    src: "src/img/**/*",
    dest: "build/img/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "build/js/",
  },
};

/**
 * cleaning img build directory
 */
function cleanImg() {
  return del(["build/img/"]);
}

/**
 * cleaning fonts build directory
 */
function cleanFonts() {
  return del(["build/fonts/"]);
}

/**
 * removed build catalog
 */
function removeBuild() {
  console.info("removed build catalog");

  return del(["build/**/*"]);
}

/**
 * control and replacement of changed html
 */
function copyHtml() {
  console.info("html file replaced");

  return gulp
    .src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

/**
 * control and replacement of changed fonts
 */
function copyFonts() {
  console.info("all font files replaced");

  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

/**
 * assembly and control of style changes
 */
function styles() {
  console.info("style file has been compiled");

  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

/**
 * assembly and preparation of images
 */
function img() {
  console.info("img files for build prepared");

  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * image change control
 */
function imgStreamHandler() {
  console.info("img files for stream prepared");

  del(["build/img/"]);

  return gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
}

/**
 * tracking changes in project files.
 */
function observer() {
  console.info("observer has been started");

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, copyHtml);
  gulp.watch(paths.html.dest).on("change", browserSync.reload);
  gulp.watch(paths.images.src, imgStreamHandler);
  gulp.watch(paths.images.src).on("unlink", cleanImg);
  gulp.watch(paths.images.src).on("change", browserSync.reload);
  gulp.watch(paths.fonts.src, copyFonts);
  gulp.watch(paths.fonts.src).on("unlink", cleanFonts);
  gulp.watch(paths.images.src).on("change", browserSync.reload);
  gulp.watch(paths.scripts.src, scripts);
}

/**
 * start and restart the project server
 */
function sync() {
  console.info("browser sync function has been started");

  browserSync.init({
    server: {
      baseDir: "build/",
    },
  });
}

/**
 * Assembly of the final project
 */
gulp.task(
  "default",
  gulp.parallel(
    removeBuild,
    copyHtml,
    copyFonts,
    imgStreamHandler,
    styles,
    scripts,
    observer,
    sync
  )
);
gulp.task(
  "build",
  gulp.series(removeBuild, copyHtml, copyFonts, img, styles, scripts)
);
