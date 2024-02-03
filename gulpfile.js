//Vamos a compilar SASS para transformarlo en CSS

const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber")

function css(cb) {
  src("./src/scss/**/*.scss") //Identificar el archivo de SASS y su ubicación
    .pipe(plumber()) //para que aunque haya errores no se caiga ña ejecución
    .pipe(sass()) //Compilarlo con el script del package.json
    .pipe(dest("build/css")); //Almacenarlo en el disco duro

  cb(); //avisa a gulp de cuando llegamos al final de la tarea
}

function dev(cb) {
  watch("./src/scss/**/*.scss", css); // el watch sirve para que esté mirando el archivo css y cada vez que note un cambio, ejecutará la function css
  cb();
}

exports.css = css;
exports.dev = dev;
