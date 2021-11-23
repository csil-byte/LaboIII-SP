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



//#region [rgba(130, 10, 460, 0.1)] POST]
export function createAnuncio(anuncio) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(anuncio)
    };

    fetch(URL, options)
        .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
        .then((data) => {
            anuncios = data;
        })
        .catch(error => {
            console.error(error);
            alert(error);
        })
        .finally(() => {});
};
//#endregion

//#region [rgba(300, 2, 20, 0.1)] PUT]
export function updateAnuncio(anuncio) {

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(anuncio)
    };

    fetch(URL + "/" + anuncio.id, options)
        .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
        .then((data) => {
            anuncios = data;
        })
        .catch(error => {
            console.error(error);
            alert(error);
        })
        .finally(() => {});
};
//#endregion