const gulp = require('gulp');
const { watch, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const cssmin = require('gulp-cssmin');
//const bs = require('browser-sync').create();
const jshint = require('gulp-jshint');
const jshintStylish = require('jshint-stylish');
const csslint = require('gulp-csslint');
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');

function copyImg(){
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist')); /* essa função grava o conteudo da pasta src na pasta dist criada */ 
}

function cleanImg(){
    return gulp.src('dist')
        .pipe(clean());
}

async function buildImg(){
    const imagemin = await import('gulp-imagemin'); //o gulp-imagemin tem um funcionamento diferente por isso é importando dessa forma dentro da sua função

    return gulp.src('dist/img/**/*')
        .pipe(imagemin.default())
        .pipe(gulp.dest('dist/img')); /* Se tem o fluxo de origem com src, que está conectando a função imagemin e o resultado dessa função está conectada ao fluxo de destino do dest */
}

function minify(){
    return gulp.src('dist/**/*.html')
        .pipe(usemin({
            'js': [uglify],
            'css': [autoprefixer, cssmin] //o usemin permite usar o autoprefixer antes de minificar
        }))//dentro de usemin foi passado um objeto com propriedades que recebem como valor um array com os plugins que se deseja executar a ordem para execução
        .pipe(gulp.dest('dist'));
}

/*
exports.server = function(){
    bs.init({ //inicializador do browser sync
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/js/*.js', { events: 'change' }, function(event){// esse watcher verifica se o arquivo foi modificado
        console.log("Linting " + event.path);
        gulp.src(event.path) //o src define o fluxo de origem para o arquivo que cfoi modificado, com a propriedade path do event que permite acesso ao arquivo que foi modificado
            .pipe(jshint()) //processamento com jshint
            .pipe(jshint.reporter(jshintStylish)) //reporter() é função padrão do plugin jshint que exibe no console os problemas que ocorreram
        event();
    })

    gulp.watch('src/css/*.css').on('change', function(event){
        gulp.src(event.path)
            .pipe(csslint())
            .pipe(csslint().reporter)
    })

    gulp.watch('src/less/*.less').on('change', function(event){
        console.log('Compilando arquivo: ' + event.path);
        gulp.src(event.path)
            .pipe(less().on('error', function(error){//se ocorrer um evento do tipo "error" a função irá tratar o tipo de erro
                console.log('ERRO: Problema na compilação!');
                console.log(error.message) //exibe a mensagem de erro do less
            }))
            .pipe(gulp.dest('src/css'));
    })
}   */
exports.constroi = series(cleanImg, copyImg, parallel(buildImg, minify));