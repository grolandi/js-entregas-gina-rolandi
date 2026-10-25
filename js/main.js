// Información
const titulo = "Pre-Entrega 3: Funciones e Integración de Lógica";
const descripcion = "Cajero Coder";

// Cajero automático
const PIN_CORRECTO = "1234";
const LIMITE_EXTRACCION = 20000;
const MAX_INTENTOS = 3;
const SALDO_INICIAL = 30000;

// FUNCIONES

// Mostar un mensaje en la consola y en un alert
const mostrarMensaje = (mensaje) => {
    console.log(mensaje);
    alert(mensaje);
};

// Función flecha: valida que 'monto' sea un número y mayor a 0. Retorna true o false.
const esMontoValido = (monto) => !isNaN(monto) && monto > 0;


// Pedir el PIN hasta un máximo de intentos.
function validarPin(pinCorrecto, maxIntentos) {
    let intentos = 0;

    while (intentos < maxIntentos) {
        let pin = prompt("Ingrese su PIN:");

        if (pin === pinCorrecto) {
            mostrarMensaje("PIN correcto. Acceso concedido.");
            return true;
        }

        intentos++;
        mostrarMensaje("PIN incorrecto. Intentos restantes: " + (maxIntentos - intentos));
    }

    return false;
}

// Pedir un monto al usuario
function pedirMonto(mensaje) {
    let monto = Number(prompt(mensaje));
    return monto;
}

// Muestrar el saldo actual
function mostrarSaldo(saldoActual) {
    mostrarMensaje("Saldo actual: $" + saldoActual);
}

// Realizar una extracción
const extraer = function (saldoActual, monto, limite) {
    if (!esMontoValido(monto)) {
        mostrarMensaje("Monto inválido.");
    } else if (monto > limite) {
        mostrarMensaje("Supera el límite de extracción de $" + limite);
    } else if (monto > saldoActual) {
        mostrarMensaje("Saldo insuficiente. Saldo actual: $" + saldoActual);
    } else {
        saldoActual = saldoActual - monto;
        mostrarMensaje("Extracción exitosa. Nuevo saldo: $" + saldoActual);
    }
    return saldoActual;
};

// Realizar un depósito
const depositar = function (saldoActual, monto) {
    if (esMontoValido(monto)) {
        saldoActual = saldoActual + monto;
        mostrarMensaje("Depósito exitoso. Nuevo saldo: $" + saldoActual);
    } else {
        mostrarMensaje("Monto inválido.");
    }
    return saldoActual;
};

// Mostrar el menú y ejecutar la operación elegida
function iniciarMenu(saldoInicial) {
    let saldo = saldoInicial;
    let continuar = true;

    while (continuar) {
        let opcion = prompt("Ingrese 1 para ver saldo, 2 para extracción, 3 para depósito, 4 para salir");

        // Si el usuario presiona "Cancelar", se sale del menú
        if (opcion === null) {
            opcion = "4";
        }

        switch (Number(opcion)) {
            case 1:
                mostrarSaldo(saldo);
                break;
            case 2:
                saldo = extraer(saldo, pedirMonto("¿Cuánto desea extraer?"), LIMITE_EXTRACCION);
                break;
            case 3:
                saldo = depositar(saldo, pedirMonto("¿Cuánto desea depositar?"));
                break;
            case 4:
                continuar = false;
                break;
            default:
                mostrarMensaje("Opción incorrecta.");
        }
    }

    return saldo;
}

// PROGRAMA PRINCIPAL 

console.log(titulo + " - " + descripcion);
alert("Bienvenido/a al " + descripcion);

let acceso = validarPin(PIN_CORRECTO, MAX_INTENTOS);

if (acceso) {
    let saldoFinal = iniciarMenu(SALDO_INICIAL);
    console.log("Saldo final de la sesión: $" + saldoFinal);
    mostrarMensaje("Gracias por usar " + descripcion + ". Retire su tarjeta.");
} else {
    mostrarMensaje("Tarjeta retenida por demasiados intentos.");
}
