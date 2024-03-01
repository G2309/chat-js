//
//
// 			Gustavo Cruz 22779
//
//

let isDarkMode = false;
let cuadrado1, cuadrado2, cuadrado3, cuadrado4;
let displayedUsers = new Set();

function toggleMode() {
  const boxes = document.querySelectorAll('.box');
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    document.body.style.backgroundColor = '#333';
    button.style.backgroundColor= '#fff';
    button.style.color= '#333';
    boxes.forEach(box => {
      box.style.backgroundColor = '#fff'; 
    });
  } else {
    document.body.style.backgroundColor = '#fff'; 
    button.style.backgroundColor= '#333';
    button.style.color= '#fff';
    boxes.forEach(box => {
      box.style.backgroundColor = '#fff'; 
    });
  }
}

// Función dada en la tarea
function validarURL(str) {
	const patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
	return patron.test(str);
}

// Función para renderizar la url que sea válida

function renderizarURL(str){
        const rend = document.createElement('div');
        const imageformat = /\.(jpeg|gif|png|jpg)$/i.test(str);
        if (imageformat){
                const image = document.createElement('img');
                image.src = str;
                rend.appendChild(image);
        } else{
                const enlace = document.createElement('a');
                enlace.href = str;
                enlace.textContent = str;
                rend.appendChild(enlace);
        }
        return rend;
}

async function loadUser() {
	const response = await fetch('http://uwu-guate.site:3000/messages');
	const users = await response.json();
	users.forEach(user => {
		if (!displayedUsers.has(user.username)) {
			const userDiv = document.createElement('div');
			userDiv.textContent = user.username;
			userbox.appendChild(userDiv);
			displayedUsers.add(user.username);
		}
	});
}
loadUser();

// Funcion para cargar los mensajes de la api, también usa la funcion para renderizar url en caso de haber en el mensaje
async function loadMessages() {
    const response = await fetch('http://uwu-guate.site:3000/messages', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const messages = await response.json();
    message_box.innerHTML = '';
    
    messages.forEach(message => {
        if (message.content) {
            const delMessage = message.content.length > 140 ? message.content.substring(0, 140) + '...' : message.content;
            const messageE = document.createElement('div');
            messageE.textContent = `${message.username}: ${delMessage}`;
            
            if(validarURL(message.content)){
                const rend = renderizarURL(message.content);
                messageE.appendChild(rend);
            } 
            message_box.appendChild(messageE);
        }
    });
}

// llamo a la función para que cargue los mensajes nada más se entra al chat y no tenga que esperar los 6seg de intervalo que puse
loadMessages();

async function sendMessage() {
	const messageText = textBox.value;
	const username = "Gustavo";
	const messageObj = {"username": username, "message": messageText};  // Aquí descubrí que el mensaje: undefined se debía a que usaba content, por que así estaba en la api >:\
	const response = await fetch('http://uwu-guate.site:3000/messages', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
	  	},
        body: JSON.stringify(messageObj)
    });

	if(response.ok){
		textBox.value='';
		await loadMessages();
	} else {
        console.error('Error al enviar mensaje',response.statusText);
    }
}


setInterval(loadMessages, 6000);  // Esperará 6 seg para actualizar los mensajes
setInterval(loadUser, 6000);  // Esperará 6 seg para actualizar los usuarios en caso que entre uno nuevo

function filterM() {
    const Smessage = messageSearch.value.toLowerCase();
    const messages = message_box.querySelectorAll('div');

    messages.forEach(message => {
        const messageText = message.textContent.toLowerCase();
        if (messageText.includes(Smessage)) {
            message.style.display = 'block';
        } else {
            message.style.display = 'none';
        }
    });
}


// Flex
const flexContainer=document.createElement('div');
flexContainer.style.display='flex';
flexContainer.style.flexWrap='wrap';
document.body.appendChild(flexContainer);

// Cuadrados
for (let i = 1; i <= 4; i++) {
	const cuadrado = document.createElement("div");
	cuadrado.classList.add("cuadrado");
	cuadrado.id='cuadrado${i}'
	switch (i) {
		case 1:
			cuadrado.style.width = 'calc(20% - 3px)';
			cuadrado.style.height = 'calc(90vh - 3px)';
			cuadrado1=cuadrado;
			break;
		case 2:
			cuadrado.style.width = 'calc(80% - 3px)';
			cuadrado.style.height = 'calc(90vh - 3px)';
			cuadrado2=cuadrado;
			break;
		case 3:
			cuadrado.style.width = 'calc(20% - 3px)';
			cuadrado.style.height = 'calc(10vh - 3px)';
			cuadrado3=cuadrado;
			break;
		case 4:
			cuadrado.style.width = 'calc(80% - 3px)';
			cuadrado.style.height = 'calc(10vh - 3px)';
			cuadrado4=cuadrado;
			break;
	}
	flexContainer.appendChild(cuadrado);
}

const cuadrados = document.querySelectorAll('.cuadrado');
cuadrados.forEach(cuadrado => {
    cuadrado.style.border = '1px solid #666';
});
// Cuadrados config 
cuadrado1.style.display='flex';
cuadrado1.style.flexDirection='column-reverse'

cuadrado2.style.display='flex';
cuadrado2.style.flexWrap='wrap';
cuadrado2.style.justifyContent='center';

cuadrado3.style.display='flex';
cuadrado3.style.flexWrap='wrap';
cuadrado3.style.justifyContent='center';
cuadrado3.style.alignItems='center';

cuadrado4.style.display='flex';
cuadrado4.style.flexWrap='wrap';
cuadrado4.style.alignItems='center';
cuadrado4.style.justifyContent='center';

// Main  -- llame así a la parte donde creo los parametros de cada espacio del chat
const button = document.createElement('button');
button.textContent = 'Cambiar tema';
button.onclick = toggleMode;
Object.assign(button.style, {
    border: 'none',
    backgroundColor: '#333',
    color: '#fff'
});
cuadrado2.appendChild(button);

const message_box = document.createElement('div');
Object.assign(message_box.style, {
    width: '100%',
    height: 'calc(85vh - 10px)', 
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',   //Escondí en X por que el scroll puede estorbar en algunos mensajes, de esta forma se ve mejor
    position: 'relative'
});
cuadrado2.appendChild(message_box);

const userbox = document.createElement('div');
Object.assign(userbox.style, {
    width: '100%',
    height: '85vh',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'visible',
    overflowX: 'hidden'
});
cuadrado1.appendChild(userbox);

const usersd = document.createElement('div');
Object.assign(usersd.style, {
    width: '100%',
    height: 'auto',
    textAlign: 'center'
});
usersd.textContent = 'Listado de usuarios:';
cuadrado1.appendChild(usersd);

const textBoxStyles = {
    width: 'calc(90% - 80px)',
    height: '5vh'
};
const sendButtonStyles = {
    height: '5vh',
    width: '70px'
};
const messageSearchStyles = {
    width: '90%',
    height: '3vh'
};

const textBox = document.createElement('input');
textBox.placeholder = 'Escribe tu mensaje: ';
Object.assign(textBox.style, textBoxStyles);
cuadrado4.appendChild(textBox);

const sendButton = document.createElement('button');
sendButton.textContent = 'Enviar';
sendButton.onclick = sendMessage;  
Object.assign(sendButton.style, sendButtonStyles);
cuadrado4.appendChild(sendButton);

const messageSearch = document.createElement('input');
messageSearch.placeholder = 'Buscar mensaje: ';
Object.assign(messageSearch.style, messageSearchStyles);
cuadrado3.appendChild(messageSearch);

const filterButton = document.createElement('button');
filterButton.textContent = 'Buscar';
filterButton.onclick = filterM;

Object.assign(filterButton.style, {
	height: '3vh',
	width: '50px'
});
cuadrado3.appendChild(filterButton);
