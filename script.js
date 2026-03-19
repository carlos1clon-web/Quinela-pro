let quinelas = []
let precio = 10

document.addEventListener("change", function(e){
if(e.target.type === "checkbox"){
calcularTotalActual()
}
})

// 🔥 TOTAL ACTUAL (ANTES DE AGREGAR)
function calcularTotalActual(){

let dobles = 0
let triples = 0

for(let i=1;i<=9;i++){

let seleccion =
document.querySelectorAll(`input[data-partido="${i}"]:checked`).length

if(seleccion===2) dobles++
if(seleccion===3) triples++

}

let combinaciones =
Math.pow(2,dobles) * Math.pow(3,triples)

let total = combinaciones * precio

document.getElementById("totalActual").innerText =
"$" + total

}

// 🔥 TOTAL GLOBAL
function calcularTotal(){

let total = quinelas.length * precio

document.getElementById("total").innerText =
"$" + total

}

// LIMPIAR
function limpiar(){

document.querySelectorAll("input[type=checkbox]").forEach(c=>{
c.checked = false
})

calcularTotalActual()

}

// ALEATORIO
function aleatorio(){

limpiar()

for(let i=1;i<=9;i++){

let opciones =
document.querySelectorAll(`input[data-partido="${i}"]`)

let r = Math.floor(Math.random()*3)

opciones[r].checked = true

}

calcularTotalActual()

}

// 🔥 AGREGAR QUINIELA (DESGLOSE REAL)
function agregarQuiniela(){

let nombre = document.getElementById("nombre").value.trim()

if(nombre===""){
alert("Debes escribir tu nombre")
return
}

let partidos = []

for(let i=1;i<=9;i++){

let opciones = []

document
.querySelectorAll(`input[data-partido="${i}"]`)
.forEach((c,index)=>{

if(c.checked){

if(index===0) opciones.push("L")
if(index===1) opciones.push("E")
if(index===2) opciones.push("V")

}

})

// ❌ VALIDAR PARTIDO VACÍO
if(opciones.length===0){
alert("Debes seleccionar todos los partidos")
return
}

partidos.push(opciones)

}

// 🔥 GENERAR TODAS LAS COMBINACIONES
let combinaciones = generarCombinaciones(partidos)

// 🔥 MOSTRAR UNA POR UNA (CLAVE 🔥)
let contenedor = document.getElementById("listaQuinielas")

combinaciones.forEach(combo=>{

quinelas.push(combo)

let div=document.createElement("div")

div.className="quinielaGuardada"

div.innerHTML = `
<b>Quiniela ${quinelas.length}:</b> ${combo.join(" ")}
<button onclick="eliminar(${quinelas.length-1})">❌</button>
`

contenedor.appendChild(div)

})

// 🔥 MENSAJE CLARO
alert("Se generaron " + combinaciones.length + " quinielas")

limpiar()
calcularTotal()

}

// 🔥 GENERADOR DE COMBINACIONES
function generarCombinaciones(arr){

if(arr.length===0) return [[]]

let primero = arr[0]
let resto = generarCombinaciones(arr.slice(1))

let resultado=[]

primero.forEach(p=>{
resto.forEach(r=>{
resultado.push([p,...r])
})
})

return resultado

}

// 🔥 ELIMINAR
function eliminar(i){

quinelas.splice(i,1)

mostrarQuinielas()
calcularTotal()

}

// 🔥 MOSTRAR TODAS (RENDER COMPLETO)
function mostrarQuinielas(){

let contenedor =
document.getElementById("listaQuinielas")

contenedor.innerHTML=""

quinelas.forEach((q,i)=>{

let div=document.createElement("div")

div.className="quinielaGuardada"

div.innerHTML = `
<b>Quiniela ${i+1}:</b> ${q.join(" ")}
<button onclick="eliminar(${i})">❌</button>
`

contenedor.appendChild(div)

})

}

// 🔥 ENVIAR WHATSAPP
function enviar(){

let nombre =
document.getElementById("nombre").value.trim()

if(nombre===""){
alert("Escribe tu nombre")
return
}

if(quinelas.length===0){
alert("No hay quinielas agregadas")
return
}

let texto =
"QUINIELAS LIGA MX\n\n"

texto+="Participante: "+nombre+"\n\n"

quinelas.forEach((q,i)=>{
texto+="Q"+(i+1)+": "+q.join(" ")+"\n"
})

texto+="\nTotal: $"+(quinelas.length * precio)

let url =
"https://wa.me/5215610791509?text="
+encodeURIComponent(texto)

window.open(url)

}
