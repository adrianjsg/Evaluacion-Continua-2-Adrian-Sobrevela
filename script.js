var sesionIniciada = false;
var sesionPausada = false;
var timer;
var tiempoTranscurrido = 0;
var numeroSesion = 1; // Variable para el número de sesión actual

// Función para iniciar la sesión de ejercicio
function iniciarSesion() {
    if (!sesionIniciada) {
        sesionIniciada = true;
        document.getElementById("startButton").disabled = true;
        document.getElementById("pauseButton").disabled = false;
        document.getElementById("stopButton").disabled = false;
        timer = setInterval(function() {
            tiempoTranscurrido++;
            mostrarTiempo(tiempoTranscurrido);
        }, 1000);
    }
}

// Función para pausar la sesión de ejercicio
function pausarSesion() {
    if (sesionIniciada && !sesionPausada) {
        clearInterval(timer);
        sesionPausada = true;
        document.getElementById("pauseButton").textContent = "Reanudar Sesión";
    } else if (sesionIniciada && sesionPausada) {
        timer = setInterval(function() {
            tiempoTranscurrido++;
            mostrarTiempo(tiempoTranscurrido);
        }, 1000);
        sesionPausada = false;
        document.getElementById("pauseButton").textContent = "Pausar Sesión";
    }
}

// Función para detener la sesión de ejercicio
function detenerSesion() {
    if (sesionIniciada) {
        clearInterval(timer);
        sesionIniciada = false;
        sesionPausada = false;
        document.getElementById("startButton").disabled = false;
        document.getElementById("pauseButton").disabled = true;
        document.getElementById("stopButton").disabled = true;
        registrarEntrenamiento(tiempoTranscurrido, numeroSesion);
        tiempoTranscurrido = 0;
        numeroSesion++;
        mostrarTiempo(0); // Reinicia el cronómetro a 00:00:00
    }
}

// Función para mostrar el tiempo transcurrido
function mostrarTiempo(tiempo) {
    var horas = Math.floor(tiempo / 3600);
    var minutos = Math.floor((tiempo % 3600) / 60);
    var segundos = tiempo % 60;
    var tiempoMostrado = (horas < 10 ? "0" : "") + horas + ":" + (minutos < 10 ? "0" : "") + minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
    document.getElementById("tiempo").textContent = tiempoMostrado;
}

// Función para registrar el entrenamiento al finalizar la sesión
function registrarEntrenamiento(tiempo, numeroSesion) {
    var registroSesiones = document.getElementById("registroSesiones");
    var duracionSesion = mostrarTiempo(tiempo);
    var nuevoRegistro = document.createElement("p");
    nuevoRegistro.textContent = "Sesión " + numeroSesion + ": Duración " + duracionSesion;
    registroSesiones.appendChild(nuevoRegistro);
}

// Función para agregar un ejercicio a la lista de la rutina
function agregarEjercicio() {
    var select = document.getElementById("ejercicios");
    var ejercicioSeleccionado = select.options[select.selectedIndex].text;
    
    var lista = document.getElementById("listaEjercicios");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(ejercicioSeleccionado));
    lista.appendChild(li);
}

// Función para guardar la rutina y mostrar la tarjeta flotante
function guardarRutina() {
    var lista = document.getElementById("listaEjercicios");
    var ejercicios = [];
    for (var i = 0; i < lista.children.length; i++) {
        ejercicios.push(lista.children[i].textContent);
    }
    console.log("Rutina guardada:");
    console.log(ejercicios);

    // Mostrar la tarjeta flotante con la rutina guardada
    var rutinaGuardada = document.getElementById("rutinaGuardada");
    rutinaGuardada.innerHTML = ""; // Limpiar la lista previa
    ejercicios.forEach(function(ejercicio) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(ejercicio));
        rutinaGuardada.appendChild(li);
    });
    document.getElementById("tarjetaFlotante").style.display = "block";
}

// Función para cerrar la tarjeta flotante
function cerrarTarjeta() {
    document.getElementById("tarjetaFlotante").style.display = "none";
}

// Función para guardar los objetivos y mostrar la tarjeta flotante
function guardarObjetivos() {
    var objetivoSelect = document.getElementById("objetivos");
    var objetivoSeleccionado = objetivoSelect.options[objetivoSelect.selectedIndex].text;
    
    var plazoInput = document.getElementById("plazo");
    var plazo = plazoInput.value;

    console.log("Objetivos guardados:");
    console.log("Objetivo: " + objetivoSeleccionado);
    console.log("Plazo: " + plazo + " meses");

    // Mostrar la tarjeta flotante con los objetivos guardados
    var objetivosGuardados = document.getElementById("objetivosGuardados");
    var nuevoObjetivo = document.createElement("li");
    nuevoObjetivo.textContent = objetivoSeleccionado + " - Plazo: " + plazo + " meses";
    objetivosGuardados.appendChild(nuevoObjetivo);
    
    document.getElementById("tarjetaFlotante").style.display = "block";
}

// Función para cerrar la tarjeta flotante
function cerrarTarjeta() {
    document.getElementById("tarjetaFlotante").style.display = "none";
}

// Función para guardar el progreso y mostrar la tarjeta flotante
function guardarProgreso() {
    var duracionInput = document.getElementById("duracion");
    var duracion = duracionInput.value;

    var intensidadInput = document.getElementById("intensidad");
    var intensidad = intensidadInput.value;

    var rendimientoInput = document.getElementById("rendimiento");
    var rendimiento = rendimientoInput.value;

    console.log("Progreso guardado:");
    console.log("Duración del Entrenamiento: " + duracion + " minutos");
    console.log("Intensidad del Entrenamiento: " + intensidad);
    console.log("Rendimiento del Entrenamiento: " + rendimiento);

    // Mostrar la tarjeta flotante con el progreso guardado
    document.getElementById("duracionProgreso").textContent = duracion;
    document.getElementById("intensidadProgreso").textContent = intensidad;
    document.getElementById("rendimientoProgreso").textContent = rendimiento;

    document.getElementById("tarjetaFlotante").style.display = "block";
}

// Función para cerrar la tarjeta flotante
function cerrarTarjeta() {
    document.getElementById("tarjetaFlotante").style.display = "none";
}

// Función para mostrar la información del ejercicio seleccionado
function mostrarInformacion() {
    var ejercicioSeleccionado = document.getElementById("ejercicios").value;
    var nombreEjercicio = "";
    var instrucciones = "";
    var musculosTrabajados = "";
    var equipoNecesario = "";
    
    // Establecer la información según el ejercicio seleccionado
    switch (ejercicioSeleccionado) {
        case "flexiones":
            nombreEjercicio = "Flexiones";
            instrucciones = "Las flexiones son un ejercicio básico de fuerza en el que se trabajan principalmente los músculos del pecho, hombros y tríceps. Para realizar una flexión, acuéstate boca abajo, coloca las manos a la altura de los hombros y empuja el cuerpo hacia arriba manteniendo el abdomen contraído.";
            musculosTrabajados = "Músculos trabajados: Pectorales, deltoides, tríceps.";
            equipoNecesario = "Equipo necesario: Ninguno.";
            break;
        case "sentadillas":
            nombreEjercicio = "Sentadillas";
            instrucciones = "Las sentadillas son un ejercicio de fuerza que trabaja principalmente los músculos de las piernas, glúteos y espalda baja. Para realizar una sentadilla, párate con los pies separados a la anchura de los hombros, baja las caderas hacia abajo como si fueras a sentarte en una silla y luego vuelve a subir.";
            musculosTrabajados = "Músculos trabajados: Cuádriceps, glúteos, isquiotibiales.";
            equipoNecesario = "Equipo necesario: Ninguno.";
            break;
        case "plancha":
            nombreEjercicio = "Plancha";
            instrucciones = "La plancha es un ejercicio de fuerza que se enfoca en fortalecer los músculos abdominales, espalda y hombros. Para realizar una plancha, colócate en posición de tabla, con los antebrazos en el suelo y el cuerpo en línea recta desde la cabeza hasta los talones, manteniendo el abdomen contraído.";
            musculosTrabajados = "Músculos trabajados: Abdominales, espalda, hombros.";
            equipoNecesario = "Equipo necesario: Ninguno.";
            break;
        case "jalon":
            nombreEjercicio = "Jalón al pecho";
            instrucciones = "El jalón al pecho es un ejercicio de fuerza que trabaja los músculos de la espalda, especialmente los dorsales. Para realizar un jalón al pecho, siéntate en la máquina de polea alta, agarra la barra con las manos separadas al ancho de los hombros y tira hacia abajo hasta que la barra toque el pecho, manteniendo la espalda recta.";
            musculosTrabajados = "Músculos trabajados: Dorsales, bíceps, trapecio.";
            equipoNecesario = "Equipo necesario: Máquina de polea alta.";
            break;
        case "biceps":
            nombreEjercicio = "Curl Bíceps";
            instrucciones = "El curl de bíceps es un ejercicio de fuerza que se enfoca en trabajar los músculos del bíceps en los brazos. Para realizar un curl de bíceps, sostén una mancuerna o barra con las palmas hacia arriba, contrae los bíceps para levantar la pesa hacia los hombros y luego baja lentamente.";
            musculosTrabajados = "Músculos trabajados: Bíceps braquial.";
            equipoNecesario = "Equipo necesario: Mancuernas o barra.";
            break;
        case "triceps":
            nombreEjercicio = "Extensiones de Tríceps";
            instrucciones = "Las extensiones de tríceps son un ejercicio de fuerza que se centra en trabajar los músculos del tríceps en la parte posterior de los brazos. Para realizar una extensión de tríceps, sostén una mancuerna o barra con las manos y extiende los brazos hacia arriba, manteniendo los codos cerca de la cabeza.";
            musculosTrabajados = "Músculos trabajados: Tríceps braquial.";
            equipoNecesario = "Equipo necesario: Mancuernas o barra.";
            break;
        // Agrega más casos según los ejercicios que desees describir
        default:
            break;
    }
    
    // Mostrar la información del ejercicio
    document.getElementById("nombreEjercicio").textContent = nombreEjercicio;
    document.getElementById("instrucciones").textContent = instrucciones;
    document.getElementById("musculosTrabajados").textContent = musculosTrabajados;
    document.getElementById("equipoNecesario").textContent = equipoNecesario;
}




