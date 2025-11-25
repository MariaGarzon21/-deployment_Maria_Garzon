let indices = [];  
let indexActual = 0; 
let textoOriginal = "";

window.onload = () => {
    const texto = document.getElementById("texto");
    textoOriginal = texto.innerHTML;
};

document.getElementById("btnBuscar").addEventListener("click", () => {
    const palabra = document.getElementById("inputBusqueda").value.trim();
    const texto = document.getElementById("texto");

    if (palabra === "") return;

    // restaurar texto original
    texto.innerHTML = textoOriginal;
    indices = [];
    indexActual = 0;

    const regex = new RegExp(palabra, "gi");
    let html = texto.innerHTML;
    let match;

    while ((match = regex.exec(html)) !== null) {
        indices.push(match.index);
    }

    if (indices.length === 0) {
        document.getElementById("contador").innerText = "Sin coincidencias";
        return;
    }

    // resaltar todas las coincidencias
    texto.innerHTML = html.replace(regex, (coincidencia) => {
        return `<span class="resaltado">${coincidencia}</span>`;
    });

    document.getElementById("contador").innerText =
        `Coincidencias: ${indices.length}`;

    activarCoincidenciaActual();
});

document.getElementById("btnSiguiente").addEventListener("click", () => {
    if (indices.length === 0) return;
    indexActual = (indexActual + 1) % indices.length;
    activarCoincidenciaActual();
});

document.getElementById("btnAnterior").addEventListener("click", () => {
    if (indices.length === 0) return;
    indexActual = (indexActual - 1 + indices.length) % indices.length;
    activarCoincidenciaActual();
});

function activarCoincidenciaActual() {
    const coincidencias = document.querySelectorAll(".resaltado");

    coincidencias.forEach(c => c.classList.remove("activo"));
    coincidencias[indexActual].classList.add("activo");

    // hacer scroll hacia la coincidencia
    coincidencias[indexActual].scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    document.getElementById("contador").innerText =
        `Coincidencia ${indexActual + 1} de ${indices.length}`;
}
