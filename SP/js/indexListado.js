export const crearListadoIndex = (data) => {
    const allCards = document.createElement('div')
    allCards.className = 'container'
        //para generar la tabla con cada elemento del listado
    let cardsRow = document.createElement('div')
    cardsRow.className = 'row'

    data.forEach(
        ({
            titulo,
            F_transaccion,
            descripcion,
            precio,
            puertas,
            kms,
            potencia,
        }) => {
            const card = document.createElement('div')
            card.className = 'col-12 col-md-6 p-3'

            card.innerHTML = `
			<div class="card">
				<div class="card-header bg-success text-white">
					<h2 class="text-center">${titulo}</h2>
				</div>
				<div class="card-body d-flex flex-column align-items-start">
					<div class="row mb-4 w-100 flex-grow-1">
						<div class="col-8">
							<h3 class="text-capitalize">${F_transaccion}</h3>
							<p>${descripcion}</p>
						</div>
						<div class="col-4 d-flex">
							<img class="img-fluid m-auto" src="./resources/auto-anuncio.jpeg" />
						</div>
					</div>
					<div class="row text-capitalize fw-bold mt-auto w-100">
						<div class="col-6 col-md-3 center-items">
							<i class="fas fa-dollar-sign text-success"></i>
							<p class="text-success">precio</p>
							<div class="text-success">${precio}</div>
						</div>
						<div class="col-6 col-md-3 center-items">
							<i class="fas fa-door-open text-purple"></i>
							<p class="text-purple">puertas</p>
							<div class="text-purple">${puertas}</div>
						</div>
						<div class="col-6 col-md-3 center-items">
							<i class="fas fa-tachometer-alt text-primary"></i>
							<p class="text-primary">kms</p>
							<div class="text-primary">${kms}</div>
						</div>
						<div class="col-6 col-md-3 center-items">
							<i class="fas fa-car-battery text-danger"></i>
							<p class="text-danger">potencia</p>
							<div class="text-danger">${potencia}</div>
						</div>
					</div>
				</div>
			</div>
			`

            const addCardToRow = () => {
                cardsRow.appendChild(card)
            }
            const addRowToAllCards = () => {
                allCards.appendChild(cardsRow)
            }
            const resetCardsRow = () => {
                cardsRow = document.createElement('div')
                cardsRow.className = 'row'
            }

            const cardsAmount = cardsRow.childNodes.length

            if (cardsAmount < 2) {
                addCardToRow()
            } else {
                addRowToAllCards()
                resetCardsRow()
                addCardToRow()
            }
        }
    )

    if (cardsRow.childNodes.length) {
        allCards.appendChild(cardsRow)
    }

    return allCards
}