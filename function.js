const texts = [
    "Nos gustaría compartir contigo este 16 de noviembre los cumpleaños de:",
    "Virginia", // Texto que mostrará la imagen de mom
    "Hector", // Texto que mostrará la imagen de dad
    "Bella", // Texto que mostrará la imagen de Bingo
    "Bianca", // Texto que mostrará la imagen de bluey
    "En Av. Pajaritos 2605, Peñaflor, parcela N°5, a las 10:00hrs. En el botón de abajo lo puedes ubicar" // Texto que mostrará la imagen bluey
];

// Arreglo de IDs de imágenes correspondientes
const images = [
    null, // No hay imagen para el primer texto
    "mom", // Imagen para "Virginia!"
    "dad", // Imagen para "Hector!"
    "Bingo", // Imagen para "Bella!"
    "bluey", // Imagen para "Bianca!"
    "family" // Imagen para "En Pajaritos 2605, parcela N°5, a las 00:00hrs. En el botón abajo puedes ubicarlo"
];

// Fondos correspondientes
const backgrounds = [
    "fondo-1",
    "fondo-2",
    "fondo-3",
    "fondo-4",
    "fondo-5",
    "fondo-6"
];

let currentIndex = 0;
const textElement = document.getElementById('dynamicText');
const audioElement = document.getElementById('audio');
const startButton = document.getElementById('startButton');
const mainElement = document.querySelector('main');
const banderinesImage = document.querySelector('.banderines')
const parqueImage = document.querySelector('.parque')
const globo1Image = document.querySelector('.globo');
const globo2Image = document.querySelector('.globo2');
const globo3Image = document.querySelector('.globo3');
const globo4Image = document.querySelector('.globo4');
const globo5Image = document.querySelector('.globo5');
const globo6Image = document.querySelector('.globo6');
const locationButton = document.getElementById('locationButton');
const backgroundMain = document.getElementById('background-main');
const textFinal = document.getElementById('textFinal');


function changeText() {
    textElement.style.opacity = 0; // Desvanecer el texto actual

    setTimeout(() => {
        // Cambiar el texto
        textElement.classList.remove("bounceIn");
        textElement.textContent = texts[currentIndex];
        void textElement.offsetWidth;
        textElement.classList.add("bounceIn");
        locationButton.classList.add("bounceIn");

        // Verificar si el texto actual es uno de los que deben ser más grandes
        if (["Virginia", "Hector", "Bella", "Bianca"].includes(texts[currentIndex])) {
            textElement.classList.add("big-text"); // Aplicar la clase para agrandar el texto
        } else {
            textElement.classList.remove("big-text"); // Remover la clase si no es uno de los nombres
        }

        // Mostrar la imagen correspondiente con el índice actualizado
        showImage(currentIndex);

        if (texts[currentIndex] === "En Av. Pajaritos 2605, Peñaflor, parcela N°5, a las 10:00hrs. En el botón de abajo lo puedes ubicar") {
            textFinal.style.display = 'block'; // Mostrar el botón de ubicación
        } else {
            textFinal.style.display = 'none'; // Ocultar el botón en otros textos
        }

        // Mostrar el botón de ubicación solo cuando el último texto se muestre
        if (texts[currentIndex] === "En Av. Pajaritos 2605, Peñaflor, parcela N°5, a las 10:00hrs. En el botón de abajo lo puedes ubicar") {
            locationButton.style.display = 'block'; // Mostrar el botón de ubicación
        } else {
            locationButton.style.display = 'none'; // Ocultar el botón en otros textos
        }

        // Actualizar el índice
        currentIndex++;
        if (currentIndex >= texts.length) {
            currentIndex = texts.length - 1; // Mantener el último texto
        }

        textElement.style.opacity = 1; // Volver a mostrar el nuevo texto

        // Cambiar el fondo
        changeBackground();


    }, 500); // Tiempo para desvanecer
}


function showBackgroundImages() {
    banderinesImage.style.display = 'block'; // Mostrar la imagen de banderines
    parqueImage.style.display = 'block'; // Mostrar la imagen del parque
    globo1Image.style.display = 'block';

    // Agregar un pequeño retraso para permitir que el CSS se aplique
    setTimeout(() => {
        banderinesImage.style.transform = 'translateY(19rem)'; // Mueve banderines hacia abajo
        parqueImage.style.transform = 'translateY(-21rem)'; // Mueve parque hacia arriba
        globo1Image.style.transform = 'translateY(-19rem)';
        globo2Image.style.transform = 'translateY(-26rem)';
        globo3Image.style.transform = 'translateY(-50rem)';
        globo4Image.style.transform = 'translateY(-35rem)';
        globo5Image.style.transform = 'translateY(-30rem)';
        globo6Image.style.transform = 'translateY(-45rem)';


    }, 1000); // Tiempo suficiente para permitir que el display cambie
}

function showImage(index) {
    const imagesList = document.querySelectorAll('.container-images img'); // Selecciona todas las imágenes
    imagesList.forEach((img) => {
        img.style.display = 'none'; // Ocultar todas las imágenes
        console.log(`Ocultando imagen: ${img.id}`); // Registro para verificar si todas las imágenes están siendo ocultadas
    });

    // Mostrar la imagen correspondiente si el índice está dentro del rango
    if (index >= 0 && index < images.length && images[index]) {
        const imgToShow = document.getElementById(images[index]); // Obtener la imagen por ID
        if (imgToShow) {
            imgToShow.style.display = 'block'; // Mostrar la imagen correspondiente
            console.log(`Mostrando imagen: ${imgToShow.src}`); // Confirmación en consola
        } else {
            console.log("Imagen no encontrada: ", images[index]); // Indicar si hay un problema con el ID
        }
    } else {
        console.log(`Índice fuera de rango o sin imagen asignada: ${index}`);
    }
}


// Función para cambiar el fondo
function changeBackground() {
    mainElement.className = ''; // Quitar todas las clases de fondo
    mainElement.classList.add(backgrounds[currentIndex]); // Añadir el fondo correspondiente
}

// Tiempo de espera antes de mostrar el primer texto (en milisegundos)
const initialDelay = 2000; // 2 segundos de espera

// Tiempos de espera específicos para cada texto (en milisegundos)
const waitTimes = [1000, 4000, 6000, 5800, 5700, 3000]; // Cambia estos valores según lo que necesites

// Función para manejar la aparición de textos subsiguientes
function displayNextText(index) {
    if (index < texts.length) {
        setTimeout(() => {
            changeText();
            displayNextText(index + 1); // Llamar a la función para el siguiente índice
        }, waitTimes[index]); // Usar el tiempo correspondiente
    }
}

// Activar el audio y los textos después de la interacción del usuario
startButton.addEventListener('click', () => {
    audioElement.play(); // Reproducir el audio
    startButton.style.display = 'none'; // Ocultar el botón después de la interacción
    backgroundMain.style.display = 'none';

    showBackgroundImages()

    // Iniciar el cambio de textos
    setTimeout(() => {
        changeText(); // Mostrar el primer texto
        displayNextText(1); // Iniciar con el segundo texto
    }, initialDelay);
});

locationButton.addEventListener('click', () => {
    window.location.href = "https://www.google.com/maps/place/Av.+Pajaritos+2605,+9760000+Penaflor,+Pe%C3%B1aflor,+Regi%C3%B3n+Metropolitana/@-33.5940657,-70.8681396,17z/data=!3m1!4b1!4m6!3m5!1s0x9662e6dc7f5139a1:0x4b64502966d40074!8m2!3d-33.5940657!4d-70.8681396!16s%2Fg%2F11jb1wf2kw?entry=ttu&g_ep=EgoyMDI0MTAyMC4xIKXMDSoASAFQAw%3D%3D";
});

document.addEventListener('visibilitychange', () => {
    const audioElement = document.getElementById('audio');
    if (document.visibilityState === 'hidden') {
        audioElement.pause(); // Pausar el audio si la pestaña está oculta
    } else if (document.visibilityState === 'visible') {
        audioElement.play(); // Reanudar el audio si la pestaña vuelve a ser visible (opcional)
    }
});
