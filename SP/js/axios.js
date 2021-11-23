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
    axios.get(URL)
        .then(({ data }) => {
            divTabla.appendChild(crearTabla(data));
            anuncios = data;
        })
        .catch(err => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            divTabla.style.display = "block";
            limpiarSpinner();
        });
};


export function getPersonaId(id) {
    return fetch(`${URL}/${id}`)
        .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
        .then((data) => {
            return data;
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            // clearDivSpinner();
        });

};
//#endregion


//#region [rgba(130, 10, 460, 0.1)] POST]
export function createAnuncio(anuncio) {

    axios.post(URL, anuncio)
        .then(({ data }) => {
            console.log("datos mostrados", data);
            anuncios = data;
        })
        .catch(err => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            // divTabla.style.display = "block";
            // document.getElementById('containerSpinner').style.display = "none";
        });

};
//#endregion

//#region [rgba(300, 2, 20, 0.1)] PUT]
export function updateAnuncio(anuncio) {

    axios.put(`${URL}/${anuncio.id}`, anuncio)
        .then(({ data }) => {
            console.log("datos mostrados", data);
            anuncios = data;
        })
        .catch(err => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            // divTabla.style.display = "block";
            // document.getElementById('containerSpinner').style.display = "none";
        });


};
//#endregion

//#region [rgba(400, 306, 50, 0.1)] DELETE]
export function deleteAnuncio(id) {
    axios.delete(`${URL}/${id}`)
        .then(({ data }) => {
            console.log("datos mostrados", data);
            anuncios = data;
        })
        .catch(err => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            // divTabla.style.display = "block";
            // document.getElementById('containerSpinner').style.display = "none";
        });
};
//#endregion