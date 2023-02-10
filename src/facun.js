const autos = [
  { marca: 'Peugeot', modelo: 1000 },
  { marca: 'Renault', modelo: 1000 },
  { marca: 'Citroen', modelo: 1000 },
  { marca: 'Toyota', modelo: 1000 },
];


const marcas = autos.map(aut => {
  return aut.marca
})

const modelos = autos.map(aut => {
  return aut.modelo
})

/* const marcaModelos = (aut) => {
  for (let i = 0; i < aut.length; i++) {
    var element = aut[i];
    console.log(`marcas: ${element.marca} Modelo: ${element.modelo},`)
  }
} */
const marcaModelos = autos.map(aut => {
  console.log(`Marcas: ${aut.marca} Modelos: ${aut.modelo}`)
})

function mostrar(data) {
  if (data === marcas) {
    console.log(marcas)
  } else if (data === modelos) {
    console.log(modelos)
  } else if (data === marcaModelos) {
    return marcaModelos
  }
}

mostrar(marcaModelos)