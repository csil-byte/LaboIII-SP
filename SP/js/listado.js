import { crearListadoIndex } from "./indexListado.js";

const URL = "http://localhost:3000/anuncios";
let anuncios = [];
const $divTablaIndex = document.getElementById("divTablaIndex");

function generarListado(anuncios) {

    if (anuncios.length > 0) {
        $divTablaIndex.appendChild(crearListadoIndex(anuncios));
    } else {
        $divTablaIndex.innerHTML = "<p>Por el momento no hay autos</p>"
    }

}

function getAll() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                anuncios = data;
                generarListado(anuncios);
            } else {
                console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
                alert(`Error: ${xhr.status} : ${xhr.statusText} `);
            }

        }
    };

    xhr.open("GET", URL);
    xhr.send();
};

getAll();