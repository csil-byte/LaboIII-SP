import { Anuncio_Objeto } from './Anuncio_Objeto.js';
import { crearTabla } from './crearTabla.js'; //Importamos la función crearTablacc

import {
    getPersonas,
    anuncios,
    deleteAnuncio
} from './xhr.js';
import { updateAnuncio, createAnuncio } from "./fetch.js";

export { divSpinner };
const $formulario = document.forms[0];
const $divTabla = document.getElementById('divTabla');
const divSpinner = document.querySelector('.spinner');
const formButtons = $formulario.querySelectorAll('button');

let submitType = null;

Array.from(formButtons).forEach((button) =>
    button.addEventListener('click', (ev) => {
        submitType = ev.target.innerText.toLowerCase();
    })
);

//#region [rgba(20, 150, 90, 0.1)] TABLA Y FORMULARIOS]
//Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.
document.addEventListener('DOMContentLoaded', function(e) {
    getPersonas();
});

//DEVUELVE EL ID SELECCIONADO DE LA TABLA Y LO BUSCA. LO DEVUELVE Y SE CARGA EN EL FORMULARIO
window.addEventListener('click', (e) => {
    if (e.target.matches('td')) {
        const id = e.target.parentElement.dataset.id;
        const anuncioElegido = anuncios.find((anuncio) => anuncio.id == id);
        cargarFormulario(anuncioElegido);
    } else if (e.target.matches('#btnCancelar')) {
        toggleButtons(true);
        $formulario.reset();
    }
});

// CARGA FORMULARIO CON DATOS DE LA TABLA
function cargarFormulario(transaccion) {
    toggleButtons(false);
    const {
        txtId,
        txtTitulo,
        F_transaccion,
        txtDescripcion,
        txtPrecio,
        txtPuertas,
        txtKms,
        txtCantidadPotencia,
    } = $formulario;

    txtId.value = transaccion.id;
    txtTitulo.value = transaccion.titulo;
    F_transaccion.value = transaccion.F_transaccion;
    txtDescripcion.value = transaccion.descripcion;
    txtPrecio.value = transaccion.precio;
    txtPuertas.value = transaccion.puertas;
    txtKms.value = transaccion.kms;
    txtCantidadPotencia.value = transaccion.potencia;
}

const handleFormSubmit = (e) => {
    e.preventDefault(); //para que no se recargue la página
    const textoDeAlerta = `¿Está seguro que desea ${submitType}?`;
    alerta(textoDeAlerta);
};

$formulario.addEventListener('submit', handleFormSubmit);

function submitForm() {
    const {
        txtId,
        txtTitulo,
        F_transaccion,
        txtDescripcion,
        txtPrecio,
        txtPuertas,
        txtKms,
        txtCantidadPotencia,
    } = $formulario;

    //Debe estar tal cual el HTML
    const form_anuncio = new Anuncio_Objeto(
        txtId.value,
        txtTitulo.value,
        F_transaccion.value,
        txtDescripcion.value,
        txtPrecio.value,
        txtPuertas.value,
        txtKms.value,
        txtCantidadPotencia.value
    );
    const id = getMaxId(anuncios);

    if (form_anuncio.id === '') {
        // form_anuncio.id = id + 1;
        handlerCrear(form_anuncio);
    } else if (submitType === 'eliminar') {
        handlerEliminar($formulario.txtId.value);
    } else {
        handlerModificar(form_anuncio);
    }
    $formulario.reset();
}
//#endregion

//#region [rgba(0, 100, 500, 0.1)] HANDLERS]

// Creación de elemento de tabla
const handlerCrear = (nuevoAnuncio) => {
    createAnuncio(nuevoAnuncio);
};

// Eliminar elemento de la tabla
const handlerEliminar = (id) => {
    toggleButtons(true);
    deleteAnuncio(id);
};

// Modificar elemento de la tabla, recibe el objeto no el ID.
const handlerModificar = (anuncioModificar) => {
    toggleButtons(true);
    updateAnuncio(anuncioModificar);
    $formulario.reset();
};
//#endregion

function toggleButtons(hide) {
    const botonEnviar = document.getElementById('btnAgregar');
    const botonEliminar = document.getElementById('btnEliminar');
    const botonCancelar = document.getElementById('btnCancelar');
    const botonModificar = document.getElementById('btnModificar');
    const botonesDeEdicion = [botonEliminar, botonCancelar, botonModificar];

    if (hide) {
        botonEnviar.style.display = 'block';
        botonesDeEdicion.map((boton) => (boton.style.display = 'none'));
    } else {
        botonEnviar.style.display = 'none';
        botonesDeEdicion.map((boton) => (boton.style.display = 'block'));
    }
}

function alerta(texto) {
    const divAlert = document.getElementById('custom-alert');
    divAlert.style.display = 'flex';

    divAlert.innerHTML = `
	<div class="m-auto bg-white p-3">
		<p>${texto}</p>
		<div class="d-flex justify-content-end w-100">
			<button id="boton-confirmar" class="btn btn-success me-3">Confirmar</button>
			<button id="boton-cancelar" class="btn btn-danger">Cancelar</button>
		</div>
	</div>
    `;
    const borrarAlerta = () => {
        divAlert.innerHTML = '';
        divAlert.style.display = 'none';
    };

    const botonConfirmar = document.getElementById('boton-confirmar');

    botonConfirmar.addEventListener('click', () => {
        submitForm();
        borrarAlerta();
    });

    const botonCancelar = document.getElementById('boton-cancelar');

    botonCancelar.addEventListener('click', () => {
        submitType = null;
        borrarAlerta();
    });
}

function actualizarTabla(data) {
    $divTabla.appendChild(crearTabla(data));
}

function limpiarTabla() {
    while ($divTabla.hasChildNodes()) {
        $divTabla.removeChild($divTabla.firstChild);
    }
}

function promedio(ev) {
    let listaFiltrada = [];
    if (ev.target.value !== 'todos') {

        listaFiltrada = anuncios.filter((anuncio) => anuncio.F_transaccion === ev.target.value);
    } else {
        listaFiltrada = anuncios;

    }
    const suma = listaFiltrada.reduce(
        (acc, cur) => acc + parseFloat(cur.precio),
        0
    );

    const promedio = suma / listaFiltrada.length;
    const promedioFiltrado = document.getElementById('txtPrecioFilter');
    promedioFiltrado.value = promedio;
}

listTransaccionesFiltrado.addEventListener('change', (ev) => {
    const input = document.getElementById('listTransaccionesFiltrado');
    const election = input.value;

    if (election === 'todos') {
        limpiarTabla();
        actualizarTabla(anuncios);
    } else {
        let listaFiltrada = anuncios
            .filter((a) => a.F_transaccion === election)
            .map((a) => a);
        limpiarTabla();
        actualizarTabla(listaFiltrada);
    }
    promedio(ev);
});

function getMaxId() {
    if (anuncios.length == 0) {
        return 0;
    } else {
        return anuncios.reduce((prev, current) =>
            prev.id > current.id ? prev : current
        ).id;
    }
}