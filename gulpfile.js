//Vamos a compilar SASS para transformarlo en CSS

const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//IMAGENES
const imagemin = require("gulp-imagemin"); //dependencia para aligerar las imagenes jpg
const avif = require("gulp-avif");
const webp = require("gulp-webp"); //dependencia para pasar las imagenes que tengamos a formato webp
const cache = require("gulp-cache");

function css(cb) {
  src("./src/scss/**/*.scss") //Identificar el archivo de SASS y su ubicación
    .pipe(plumber()) //para que aunque haya errores no se caiga ña ejecución
    .pipe(sass()) //Compilarlo con el script del package.json
    .pipe(dest("build/css")); //Almacenarlo en el disco duro

  cb(); //avisa a gulp de cuando llegamos al final de la tarea
}

function javascript(cb) {
  src("./src/js/**/*.js").pipe(dest("build/js"));
  cb();
}

function imagenes(cb) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  cb();
}

function versionAvif(cb) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
  cb();
}

function versionWebp(cb) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  cb();
}

function dev(cb) {
  watch("./src/scss/**/*.scss", css); // el watch sirve para que esté mirando el archivo css y cada vez que note un cambio, ejecutará la function css
  watch("./src/js/**/*.js", javascript); // el watch sirve para que esté mirando el archivo js y cada vez que note un cambio, ejecutará la function js
  cb();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionAvif, versionWebp, javascript, dev); //parallel ejecuta todas las functions a la vez.
