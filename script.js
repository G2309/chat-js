// 			Gustavo Cruz 22779
//
//
var cuadrado4 = document.getElementById('cuadrado1');
var cuadrado4 = document.getElementById('cuadrado2');
var cuadrado4 = document.getElementById('cuadrado3');
var cuadrado4 = document.getElementById('cuadrado4');


function toggleModo() {
    var body = document.querySelector('body');

    var colorActual = body.style.backgroundColor;

    if (colorActual === '' || colorActual === 'white') {
        body.style.backgroundColor = 'black';
        body.style.color = 'white'; 
    } else {
        body.style.backgroundColor = 'white';
        body.style.color = 'black'; 
    }
}

function crearCuadrados() {
    var body = document.querySelector('body');
    // Cuadrado 1 será el cuadrado de los users
    var cuadrado1 = document.createElement('div');
    cuadrado1.classList.add('cuadrado');
    cuadrado1.setAttribute('id', 'cuadrado1');
    body.appendChild(cuadrado1);
    // Cuadrado 2 será el cuadrado de el chat
    var cuadrado2 = document.createElement('div');
    cuadrado2.classList.add('cuadrado');
    cuadrado2.setAttribute('id', 'cuadrado2');
    body.appendChild(cuadrado2);
    // Cuadrado 3 será el cuadrado del perfil de usuario
    var cuadrado3 = document.createElement('div');
    cuadrado3.classList.add('cuadrado');
    cuadrado3.setAttribute('id', 'cuadrado3');
    body.appendChild(cuadrado3);
    // Cuadrado 4 sera el cuadro de input
    var cuadrado4 = document.createElement('div');
    cuadrado4.classList.add('cuadrado');
    cuadrado4.setAttribute('id', 'cuadrado4');
    body.appendChild(cuadrado4);

    body.style.display = 'flex';
    body.style.flexWrap = 'wrap';
    body.style.height = '100vh'; 
}

function modificarTamanosCuadrados() {
    var cuadrado1 = document.getElementById('cuadrado1');
    cuadrado1.style.width = 'calc(20% - 5px)';
    cuadrado1.style.height = 'calc(90vh - 5px)';

    var cuadrado2 = document.getElementById('cuadrado2');
    cuadrado2.style.width = 'calc(80% - 5px)'; 
    cuadrado2.style.height = 'calc(90vh - 5px)';

    var cuadrado3 = document.getElementById('cuadrado3');
    cuadrado3.style.width = 'calc(40% - 5px)';
    cuadrado3.style.height = 'calc(10vh - 5px)'; 

    var cuadrado4 = document.getElementById('cuadrado4');
    cuadrado4.style.width = 'calc(60% - 5px)'; 
    cuadrado4.style.height = 'calc(10vh - 5px)';
}


crearCuadrados();
modificarTamanosCuadrados();
toggleModo();
