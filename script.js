// Esperar a que el DOM esté completamente construido
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Captura de Elementos del DOM mediante Selectores
    const form = document.getElementById("formPostulacion");
    const alertContenedor = document.getElementById("alertContenedor");
    
    // 2. Controladores de Eventos (Event Listeners)
    form.addEventListener("submit", (event) => {
        // Detener la recarga nativa de la página (Principio UX)
        event.preventDefault();
        
        // Inicializar variables de control y tipos de datos
        let formularioValido = true;
        
        // Elementos de Entrada
        const nombreInput = document.getElementById("nombre");
        const correoInput = document.getElementById("correo");
        const telefonoInput = document.getElementById("telefono");
        const programaSelect = document.getElementById("programa");
        const terminosCheckbox = document.getElementById("terminos");

        // 3. Expresiones Regulares (Regex) para validaciones complejas
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
        const regexTelefono = /^[9][0-9]{8}\$/; // Estándar de 9 dígitos numéricos en Perú que inician con 9

        // --- VALIDACIONES INDIVIDUALES ---
        
        // Validación Nombre
        if (nombreInput.value.trim().length < 3) {
            marcarInvalido(nombreInput);
            formularioValido = false;
        } else {
            marcarValido(nombreInput);
        }

        // Validación Correo
        if (!regexCorreo.test(correoInput.value.trim())) {
            marcarInvalido(correoInput);
            formularioValido = false;
        } else {
            marcarValido(correoInput);
        }

        // Validación Teléfono
        if (!regexTelefono.test(telefonoInput.value.trim())) {
            marcarInvalido(telefonoInput);
            formularioValido = false;
        } else {
            marcarValido(telefonoInput);
        }

        // Validación Lista Desplegable (Programa)
        if (programaSelect.value === "") {
            marcarInvalido(programaSelect);
            formularioValido = false;
        } else {
            marcarValido(programaSelect);
        }

        // Validación Casilla de Verificación (Términos)
        if (!terminosCheckbox.checked) {
            marcarInvalido(terminosCheckbox);
            formularioValido = false;
        } else {
            marcarValido(terminosCheckbox);
        }

        // 4. Estructuras de Control para Procesamiento Final
        if (formularioValido) {
            // Simulación de envío mediante método POST asíncrono
            mostrarMensajeExito("¡Registro Exicitoso! Tus datos han sido enviados de forma segura mediante protocolo POST. Pronto nos comunicaremos contigo.");
            form.reset();
            limpiarClasesValidacion([nombreInput, correoInput, telefonoInput, programaSelect, terminosCheckbox]);
        } else {
            mostrarMensajeError("Por favor, corrige los campos marcados en rojo antes de enviar.");
        }
    });

    // Funciones Auxiliares de Modificación Dinámica del DOM (Clases Bootstrap)
    function marcarInvalido(elemento) {
        elemento.classList.remove("is-valid");
        elemento.classList.add("is-invalid");
    }

    function marcarValido(elemento) {
        elemento.classList.remove("is-invalid");
        elemento.classList.add("is-valid");
    }

    function limpiarClasesValidacion(elementos) {
    elementos.forEach(el => el.classList.remove("is-valid", "is-invalid"));
}

    // Inyección dinámica de alertas UI/UX en el HTML
    function mostrarMensajeExito(mensaje) {
        alertContenedor.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Felicidades:</strong> ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    function mostrarMensajeError(mensaje) {
        alertContenedor.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
});
