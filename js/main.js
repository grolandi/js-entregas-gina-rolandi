// Información
const titulo = "Pre-Entrega 3: Funciones e Integración de Lógica";
const descripcion = "Cajero Coder";

// Cajero automático
const pinCorrecto = "1234";
const limiteExtraccion = 20000;
const maxIntentos = 3;
const saldoInicial = 30000;

// ARRAY: agenda de destinatarios para transferencias
const destinatarios = ["Gina", "Jesus", "Milton", "Tomas", "Sol"];

// FUNCIONES

// Función flecha: valida que 'monto' sea un número y mayor a 0. Retorna true o false.
const esMontoValido = (monto) => !isNaN(monto) && monto > 0;

// Función flecha: valida que el texto ingresado no esté vacío ni cancelado
const esTextoValido = (texto) => texto !== null && texto.trim() !== "";

// Pedir el PIN hasta un máximo de intentos. Retorna true si el PIN es correcto.
function validarPin(pin, intentosMaximos) {
    let intentos = 0;

    while (intentos < intentosMaximos) {
        if (prompt("Ingrese su PIN:") === pin) {
            alert("PIN correcto. Acceso concedido.");
            return true;
        }

        intentos++;
        alert("PIN incorrecto. Intentos restantes: " + (intentosMaximos - intentos));
    }

    return false;
}

// Realizar una extracción. Retorna el nuevo saldo.
const extraer = (saldoActual, monto, limite) => {
    switch (true) {
        case !esMontoValido(monto):
            alert("Monto inválido.");
            break;
        case monto > limite:
            alert("Supera el límite de extracción de $" + limite);
            break;
        case monto > saldoActual:
            alert("Saldo insuficiente. Saldo actual: $" + saldoActual);
            break;
        default:
            saldoActual = saldoActual - monto;
            alert("Extracción exitosa. Nuevo saldo: $" + saldoActual);
    }
    return saldoActual;
};

// Realizar un depósito. Retorna el nuevo saldo.
const depositar = (saldoActual, monto) => {
    if (esMontoValido(monto)) {
        saldoActual = saldoActual + monto;
        alert("Depósito exitoso. Nuevo saldo: $" + saldoActual);
    } else {
        alert("Monto inválido.");
    }
    return saldoActual;
};


// FUNCIONES DEL ARRAY

// Recorrer la agenda y mostrar destinatarios
function listarDestinatarios(lista) {
    let texto = "";
    let posicion = 0;

    for (const destinatario of lista) {
        texto = texto + posicion + ". " + destinatario + "\n";
        posicion++;
    }

    alert("Agenda de destinatarios:\n" + texto + "Total: " + lista.length);
}

// Agregar un destinatario: al principio si es favorito (unshift), si no al final (push)
function agregarDestinatario(lista, nombre, esFavorito) {
    switch (true) {
        case !esTextoValido(nombre):
            alert("Nombre inválido.");
            break;
        case lista.includes(nombre):
            alert(nombre + " ya está en la agenda.");
            break;
        case esFavorito:
            lista.unshift(nombre);
            alert(nombre + " se agregó como favorito, al principio de la agenda.");
            break;
        default:
            lista.push(nombre);
            alert(nombre + " se agregó al final de la agenda.");
    }
}

// Eliminar el último destinatario (pop) y mostrar cuál fue
function eliminarUltimoDestinatario(lista) {
    if (lista.length === 0) {
        alert("La agenda está vacía.");
    } else {
        alert("Se ha eliminado el elemento: " + lista.pop());
    }
}

// Corregir el nombre de un destinatario reemplazándolo por índice (splice)
function editarDestinatario(lista, nombreActual, nombreNuevo) {
    const posicion = lista.indexOf(nombreActual);

    if (posicion === -1) {
        alert("Destinatario no encontrado en la agenda.");
    } else if (!esTextoValido(nombreNuevo)) {
        alert("Nombre inválido.");
    } else {
        lista.splice(posicion, 1, nombreNuevo);
        alert("Posición " + posicion + ": " + nombreActual + " fue reemplazado por " + nombreNuevo);
    }
}

// Transferir a un destinatario de la agenda. Retorna el nuevo saldo.
function transferir(saldoActual, lista, nombre, monto) {
    switch (true) {
        case !lista.includes(nombre):
            alert("Destinatario no encontrado en la agenda. Agréguelo antes de transferir.");
            break;
        case !esMontoValido(monto):
            alert("Monto inválido.");
            break;
        case monto > saldoActual:
            alert("Saldo insuficiente. Saldo actual: $" + saldoActual);
            break;
        default:
            saldoActual = saldoActual - monto;
            alert("Transferencia de $" + monto + " a " + nombre + " exitosa. Nuevo saldo: $" + saldoActual);
    }
    return saldoActual;
}


// Mostrar el menú y ejecutar la operación elegida. Retorna el saldo final.
function iniciarMenu(saldoDeInicio) {
    let saldo = saldoDeInicio;
    let continuar = true;
    let nombre;

    while (continuar) {
        // El dato se convierte a número al capturarlo. Si se presiona "Cancelar", Number(null) es 0.
        const opcion = Number(prompt(
            "Elija una opción:\n" +
            "1. Ver saldo\n" +
            "2. Extracción\n" +
            "3. Depósito\n" +
            "4. Transferir\n" +
            "5. Ver agenda de destinatarios\n" +
            "6. Agregar destinatario\n" +
            "7. Eliminar último destinatario\n" +
            "8. Corregir nombre de un destinatario\n" +
            "9. Salir"
        ));

        switch (opcion) {
            case 1:
                alert("Saldo actual: $" + saldo);
                break;
            case 2:
                saldo = extraer(saldo, Number(prompt("¿Cuánto desea extraer?")), limiteExtraccion);
                break;
            case 3:
                saldo = depositar(saldo, Number(prompt("¿Cuánto desea depositar?")));
                break;
            case 4:
                nombre = prompt("¿A quién desea transferir? Agenda: " + destinatarios.join(", "));
                saldo = transferir(saldo, destinatarios, nombre, Number(prompt("¿Cuánto desea transferir?")));
                break;
            case 5:
                listarDestinatarios(destinatarios);
                break;
            case 6:
                nombre = prompt("Nombre del nuevo destinatario:");
                agregarDestinatario(destinatarios, nombre, prompt("¿Agregarlo como favorito, al principio de la agenda? (s/n)") === "s");
                break;
            case 7:
                eliminarUltimoDestinatario(destinatarios);
                break;
            case 8:
                nombre = prompt("¿Qué destinatario desea corregir? Agenda: " + destinatarios.join(", "));
                editarDestinatario(destinatarios, nombre, prompt("Nuevo nombre para " + nombre + ":"));
                break;
            case 0:
            case 9:
                continuar = false;
                break;
            default:
                alert("Opción incorrecta.");
        }
    }

    return saldo;
}

// PROGRAMA PRINCIPAL

console.log(titulo + " - " + descripcion);
alert("Bienvenido/a al " + descripcion);

if (validarPin(pinCorrecto, maxIntentos)) {
    console.log("Saldo final de la sesión: $" + iniciarMenu(saldoInicial));
    alert("Gracias por usar " + descripcion + ". Retire su tarjeta.");
} else {
    alert("Tarjeta retenida por demasiados intentos.");
}
