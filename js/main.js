// Información
const titulo = "Pre-Entrega 2: Lógica de Programación y Control de Flujo";
const descripcion = "Cajero Coder";

// Simulador: Cajero automático
const PIN_CORRECTO = "1234";
const LIMITE_EXTRACCION = 20000;
const MAX_INTENTOS = 3;

let saldo = 30000;
let intentos = 0;
let acceso = false;

alert("Bienvenido/a al Cajero Coder");

// 1. VALIDAR PIN: máximo 3 intentos
while (intentos < MAX_INTENTOS && acceso == false) {
    let pin = prompt("Ingrese su PIN:");
    if (pin == PIN_CORRECTO) {
        acceso = true;
        console.log("PIN correcto. Acceso concedido.");
        alert("PIN correcto. Acceso concedido.");
    } else {
        intentos++;
        console.log("PIN incorrecto. Intentos restantes: " + (MAX_INTENTOS - intentos));
        alert("PIN incorrecto. Intentos restantes: " + (MAX_INTENTOS - intentos));
    }
}

// 2. MENÚ: solo si el PIN fue correcto
if (acceso) {
    let continuar = true;
    let monto;

    while (continuar) {
        let menu = Number(prompt("Ingrese 1 para ver saldo, 2 para extracción, 3 para depósito, 4 para salir"));

        switch (menu) {
            case 1:
                console.log("Saldo actual: $" + saldo);
                alert("Saldo actual: $" + saldo);
                break;
            case 2:
                monto = Number(prompt("¿Cuánto desea extraer?"));
                if (monto <= 0) {
                    console.log("Monto inválido.");
                    alert("Monto inválido.");
                } else if (monto > LIMITE_EXTRACCION) {
                    console.log("Supera el límite de extracción de $" + LIMITE_EXTRACCION);
                    alert("Supera el límite de extracción de $" + LIMITE_EXTRACCION);
                } else if (monto > saldo) {
                    console.log("Saldo insuficiente. Saldo actual: $" + saldo);
                    alert("Saldo insuficiente. Saldo actual: $" + saldo);
                } else {
                    saldo = saldo - monto;
                    console.log("Extracción exitosa. Nuevo saldo: $" + saldo);
                    alert("Extracción exitosa. Nuevo saldo: $" + saldo);
                }
                break;
            case 3:
                monto = Number(prompt("¿Cuánto desea depositar?"));
                if (monto > 0) {
                    saldo = saldo + monto;
                    console.log("Depósito exitoso. Nuevo saldo: $" + saldo);
                    alert("Depósito exitoso. Nuevo saldo: $" + saldo);
                } else {
                    console.log("Monto inválido.");
                    alert("Monto inválido.");
                }
                break;
            case 4:
                continuar = false;
                break;
            default:
                console.log("Opción incorrecta.");
                alert("Opción incorrecta.");
        }
    }
    console.log("Gracias por usar Cajero Coder. Retire su tarjeta.");
    alert("Gracias por usar Cajero Coder. Retire su tarjeta.");
} else {
    console.log("Tarjeta retenida por demasiados intentos.");
    alert("Tarjeta retenida por demasiados intentos.");
}
