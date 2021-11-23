import { crearTabla } from "./crearTabla.js"; //Importamos la función crearTablacc
export { anuncios };
import { divSpinner } from "./script.js";
const URL = "http://localhost:3000/anuncios";


let anuncios = [];

//#region [rgba(0, 300, 100, 0.1)] SPINNER]


// creación de spinner para cargar
function crearSpinner() {
    const spinner = document.createElement("img");
    spinner.width = 150;
    spinner.setAttribute("src", "./resources/wheelspin.gif");
    spinner.setAttribute("alt", "loadinh");
    return spinner;
};
const limpiarSpinner = () => {
    while (divSpinner.hasChildNodes()) {
        divSpinner.removeChild(divSpinner.firstChild);
    }
};

//#endregion


//#region [rgba(0, 100, 500, 0.1)] GET]
export function getPersonas() {
    divSpinner.appendChild(crearSpinner());
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let data = JSON.parse(xhr.responseText);
                anuncios = data;
                divTabla.appendChild(crearTabla(data));

            } else {
                console.log("Error: " + xhr.status + " - " + xhr.statusText);
            }
            divTabla.style.display = "block";
            limpiarSpinner();
        }
    });
    xhr.open("GET", URL);
    xhr.send();
};

//#endregion



//#region [rgba(400, 306, 50, 0.1)] DELETE]
export function deleteAnuncio(id) {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                anuncios = data;
            } else {
                console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
                alert(`Error: ${xhr.status} : ${xhr.statusText} `);
            }
        } else {}
    });

    xhr.open("DELETE", URL + "/" + id);
    xhr.send();
};
//#endregion