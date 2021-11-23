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
export async function getPersonas() {
    try {
        divSpinner.appendChild(crearSpinner());
        divTabla.innerHTML = "";
        let res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`Error: ${response.status} : ${response.statusText} `);
        }
        const data = await res.json();
        anuncios = data;
        divTabla.appendChild(crearTabla(data));
    } catch (err) {
        console.log('Entré al catch for some reason');
        console.error(err.status);
    } finally {
        limpiarSpinner();
    }
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
export async function createAnuncio(anuncio) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(anuncio)
    }
    try {

        let res = await fetch(URL, options);
        if (!res.ok) {
            throw new Error(`Error: ${response.status} : ${response.statusText} `);
        }
        const data = await res.json();
        anuncios = data;
    } catch (err) {
        console.error(err.status);
    } finally {

    }

};
//#endregion

//#region [rgba(300, 2, 20, 0.1)] PUT]
export async function updateAnuncio(anuncio) {

    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(anuncio)
    }

    try {
        let res = await fetch(`${URL}/${anuncio.id}`, options);
        if (!res.ok) {
            throw new Error(`Error: ${response.status} : ${response.statusText} `);
        }
        const data = await res.json();
        anuncios = data;
    } catch (err) {
        console.error(err.status);
    } finally {

    }
};
//#endregion

//#region [rgba(400, 306, 50, 0.1)] DELETE]
export async function deleteAnuncio(id) {

    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        }
    }
    try {
        let res = await fetch(`${URL}/${id}`, options);
        if (!res.ok) {
            throw new Error(`Error: ${response.status} : ${response.statusText} `);
        }
        const data = await res.json();
        anuncios = data;
    } catch (err) {
        console.error(err.status);
    } finally {

    }
};
//#endregion