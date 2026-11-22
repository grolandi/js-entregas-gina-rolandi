// Información
const titulo = "Pre-Entrega 4: Uso e interacción con Arrays";
const descripcion = "Playlist CODER";

// Playlist inicial
const playlist = ["Iris", "Yellow", "Creep", "Complicated", "Wonderwall"];


// FUNCIONES

// Revisa que el texto no esté vacío
function esTextoValido(texto) {
    if (texto !== null && texto !== "") { 
        return true;
    }
    return false;
}

// Muestra la playlist
function mostrarPlaylist(lista) {
    let texto = "";
    let indice = 0;

    console.log("Playlist actual");
    for (const cancion of lista) {
        console.log("[" + indice + "] " + cancion);
        texto = texto + "[" + indice + "] " + cancion + "\n"; // '\n' es un salto de línea
        indice++; 
    }
    console.log("Total: " + lista.length + " canciones");

    alert("Playlist actual:\n" + texto + "\nTotal: " + lista.length + " canciones");
}

// Agrega una canción al final (.push)
function agregarAlFinal(lista, cancion) {
    if (esTextoValido(cancion) === false) { 
        alert("Nombre inválido.");
    } else if (lista.includes(cancion)) { 
        alert(cancion + " ya está en la playlist.");
    } else {
        lista.push(cancion);
        alert(cancion + " se agregó al final de la playlist.");
    }
}

// Agrega una canción al principio (.unshift)
function agregarAlPrincipio(lista, cancion) {
    if (esTextoValido(cancion) === false) {
        alert("Nombre inválido.");
    } else if (lista.includes(cancion)) {
        alert(cancion + " ya está en la playlist.");
    } else {
        lista.unshift(cancion); 
        alert(cancion + " se reproducirá a continuación.");
    }
}

// Borra la última canción
function quitarUltima(lista) {
    const eliminada = lista.pop();
    alert("Se ha eliminado el elemento: " + eliminada);
}

// Busca una canción y muestra su posición (.indexOF / .includes)
function buscarCancion(lista, buscada) {
    if (lista.includes(buscada)) {
        const posicion = lista.indexOf(buscada);
        console.log(buscada + " está en la posición [" + posicion + "] de la playlist");
        alert(buscada + " está en la posición [" + posicion + "] de la playlist");
    } else {
        console.log(buscada + " no está en la playlist");
        alert(buscada + " no está en la playlist.");
    }
}

// Reemplaza una canción (.sploce)
function reemplazarCancion(lista, indice, nuevaCancion) {
    if (indice < lista.length) {
        lista.splice(indice, 1, nuevaCancion);
        alert("La canción " + indice + " ahora es " + nuevaCancion);
    } else {
        alert("Ese número no existe.");
    }
}


// MENÚ PRINCUPAL
function iniciarMenu(lista) {
    let continuar = true;
    while (continuar) {
        const opcion = Number(prompt(
            "Elijí una opción:\n" +
            "1. Ver playlist\n" +
            "2. Agregar canción al final\n" +
            "3. Agregar canción al inicio\n" +
            "4. Quitar última canción\n" +
            "5. Buscar canción\n" +
            "6. Reemplazar canción\n" +
            "0. Salir"
        ));

        switch (opcion) {
            case 1:
                mostrarPlaylist(lista);
                break;
            case 2:
                agregarAlFinal(lista, prompt("Nombre de la canción:"));
                break;
            case 3:
                agregarAlPrincipio(lista, prompt("Nombre de la canción:"));
                break;
            case 4:
                quitarUltima(lista);
                break;
            case 5:
                buscarCancion(lista, prompt("¿Qué canción querés buscar?"));
                break;
            case 6:
                const indice = Number(prompt("Número de la canción que querés reemplazar:"));
                const nueva = prompt("Nombre de la nueva canción:");
                reemplazarCancion(lista, indice, nueva);
                break;
            case 0:
                continuar = false;
                break;
            default:
                alert("Opción incorrecta.");
        }
    }
}


// PROGRAMA PRINCIPAL

console.log(titulo + " - " + descripcion);
alert("Bienvenido/a a " + descripcion + ". La playlist tiene " + playlist.length + " canciones.");

iniciarMenu(playlist);
alert("Gracias por usar " + descripcion + ".");
