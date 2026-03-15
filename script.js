let quinelas = []
let precio = 10
let total = 0

function calcularTotal(){

let partidos = {}

document.querySelectorAll("input[type=checkbox]").forEach(c => {

let partido = c.dataset.partido

if(!partidos[partido]){
partidos[partido] = 0
}

if(c.checked){
partidos[partido]++
}

})

let combinaciones = 1

for(let p in partidos){

let seleccionadas = partidos[p]

if(seleccionadas === 0){
seleccionadas = 1
}

combinaciones *= seleccionadas

}

let totalActual = combin
