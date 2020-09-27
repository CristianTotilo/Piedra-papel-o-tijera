/* ############################################# */
/*              VARIABLES GLOBALES               */
/* ############################################# */
var opcionJugador



/* ############################################# */
/*              FUNCIONES GLOBALES               */
/* ############################################# */
//-------------------------------------------------------
// NOMBRE   : function ponerTitulo(titulo)
// ENTRADA  : titulo a representar
// SALIDA   : -
// ACCIÓN   : representa el título del juego en el header
//-------------------------------------------------------
function ponerTitulo(titulo) {
    $('.caja-titulo').html('<i>'+titulo+'<i>')
}

//------------------------------------------------------
// NOMBRE   : function imprimirResultado(resultado)
// ENTRADA  : resultado (GANÉ, EMPATÉ ó PERDÍ)
// SALIDA   : -
// ACCIÓN   : imprime el resultado del juego
//------------------------------------------------------
function imprimirResultado(resultado) {
    $('.caja-resultado').html('<i>'+resultado+'<i>')

    var resultadoColor = {
        'EMPATÉ' : 'yellow',
        'GANÉ' : 'limegreen',
        'PERDÍ' : '#FF0000'
    }

    var color = resultadoColor[resultado]
    $('.caja-resultado').css('color', color? color:'')
}

//-------------------------------------------------------------
// NOMBRE   : function imprimirImagen(id, img)
// ENTRADA  : id de la imagen, imagen (piedra, papel ó tijera)
// SALIDA   : - 
// ACCIÓN   : imprime la imagen del jugador o de la computadora
//-------------------------------------------------------------
function imprimirImagen(id, img) {
    $('#'+id).attr('src', img?'imagenes/'+img+'.jpg':'')
}

//------------------------------------------------------------
// NOMBRE   : function configurarSelectorJugador()
// ENTRADA  : -
// SALIDA   : -
// ACCIÓN   : setea la función del selector de opción de juego
//------------------------------------------------------------
function configurarSelectorJugador() {
    opcionJugador = 'piedra'
    imprimirImagen('img-jugador',opcionJugador)

    $('select').change(cambioOpcionJugador)
    function cambioOpcionJugador() {
        //console.log('cambioOpcionJugador')

        opcionJugador = $('select').val()
        console.log(opcionJugador)
        imprimirImagen('img-jugador',opcionJugador)
        imprimirImagen('img-computadora','')
        imprimirResultado('Jugar!')
    }
}

//------------------------------------------------------
// NOMBRE   : function sortear()
// ENTRADA  : -
// SALIDA   : piedra, papel, tijera
// ACCIÓN   : Sortea la pción de la computadora al azar
//------------------------------------------------------
function sortear() {
    var random = Math.random()      // 0 - 0.99999999999.....
    random *= 3                     // 0 - 2.99999999999.....
    random = parseInt(random)       // 0 - 2 (0: piedra, 1: papel, 2: tijera)

    var opciones = ['piedra','papel','tijera']

    return opciones[random]
}

//---------------------------------------------------------------------------------
// NOMBRE   : function obtenerResultado(oc,oj)
// ENTRADA  : oc: opción computadora, oj: opción de jugador
// SALIDA   : EMPATÉ, GANÉ ó PERDÍ
// ACCIÓN   : analiza la resultado del juego, según las opciones de ambos jugadores
//---------------------------------------------------------------------------------
function obtenerResultado(oc,oj) {
    var res = 'EMPATÉ'

    switch(oc) {
        case 'piedra':
            if(oj == 'papel') res = 'GANÉ'
            else if(oj == 'tijera') res = 'PERDÍ'
            break

        case 'papel':
            if(oj == 'tijera') res = 'GANÉ'
            else if(oj == 'piedra') res = 'PERDÍ'
            break

        case 'tijera':
            if(oj == 'piedra') res = 'GANÉ'
            else if(oj == 'papel') res = 'PERDÍ'
            break
    }

    return res
}

//------------------------------------------------------
// NOMBRE   : function configurarBotonJugar()
// ENTRADA  : -
// SALIDA   : -
// ACCIÓN   : lanzar el juego
//------------------------------------------------------
function configurarBotonJugar() {
    $('button').click(jugar)

    function jugar() {
        console.log('jugar')

        var opcionComputadora = sortear()
        imprimirImagen('img-computadora',opcionComputadora)

        var resultado = obtenerResultado(opcionComputadora, opcionJugador)
        imprimirResultado(resultado)
    }
}

//------------------------------------------------------
// NOMBRE   : function start()
// ENTRADA  : -
// SALIDA   : -
// ACCIÓN   : punto de entrada del juego
//------------------------------------------------------
function start() {
    console.log('Piedra, Papel ó Tijera')
    
    ponerTitulo('Piedra, Papel ó Tijera')
    configurarSelectorJugador()
    configurarBotonJugar()

    imprimirResultado('Por favor, elegir opción y jugar')
    
}

/* ############################################# */
/*                  EJECUCIÓN                    */
/* ############################################# */
$(document).ready(start)
