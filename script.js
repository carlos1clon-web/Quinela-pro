let quinielas = []
let precio = 10

document.addEventListener("change", function(e){
if(e.target.type === "checkbox"){
calcularTotalActual()
}
})

// 🔥 TOTAL ACTUAL
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

let total = quinielas.length * precio

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

// 🔥 AGREGAR QUINIELA
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

if(opciones.length===0){
alert("Debes seleccionar todos los partidos")
return
}

partidos.push(opciones)

}

// 🔥 GENERAR COMBINACIONES
let combinaciones = generarCombinaciones(partidos)

// 🔥 MOSTRAR
let contenedor = document.getElementById("listaQuinielas")

combinaciones.forEach(combo=>{

quinielas.push(combo)

let div=document.createElement("div")

div.className="quinielaGuardada"

div.innerHTML = `
<b>Quiniela ${quinielas.length}:</b> ${combo.join(" ")}
<button onclick="eliminar(${quinielas.length-1})">❌</button>
`

contenedor.appendChild(div)

})

alert("Se generaron " + combinaciones.length + " quinielas")

limpiar()
calcularTotal()

}

// 🔥 GENERADOR
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

quinielas.splice(i,1)

mostrarQuinielas()
calcularTotal()

}

// 🔥 RENDER
function mostrarQuinielas(){

let contenedor =
document.getElementById("listaQuinielas")

contenedor.innerHTML=""

quinielas.forEach((q,i)=>{

let div=document.createElement("div")

div.className="quinielaGuardada"

div.innerHTML = `
<b>Quiniela ${i+1}:</b> ${q.join(" ")}
<button onclick="eliminar(${i})">❌</button>
`

contenedor.appendChild(div)

})

}

// 🔥 ENVIAR A GOOGLE SHEETS
function enviarASheets(nombre, quinielas){

fetch("https://script.google.com/macros/s/AKfycbwy45c3eHH8uLcSHibykU1vJD6eGx1jlb37f4AMoaqkzhGnxhdd-ZtiuQP-mVfrfXU0Eg/exec", {
  method: "POST",
  body: JSON.stringify({
    nombre: nombre,
    juego: JSON.stringify(quinielas)
  })
})
.then(res => res.text())
.then(data => console.log("Respuesta:", data))
.catch(err => console.error("Error:", err));

}

// 🔥 ENVIAR WHATSAPP + SHEETS
function enviar(){

let nombre =
document.getElementById("nombre").value.trim()

if(nombre===""){
alert("Escribe tu nombre")
return
}

if(quinielas.length===0){
alert("No hay quinielas agregadas")
return
}

// 🔥 ENVÍA A GOOGLE SHEETS
enviarASheets(nombre, quinielas)

let texto = "QUINIELAS LIGA MX\n\n"

texto += "Participante: " + nombre + "\n\n"

quinielas.forEach((q,i)=>{
texto += "Q" + (i+1) + ": " + q.join(" ") + "\n"
})

texto += "\nTotal: $" + (quinielas.length * precio)

let telefono = "525610791509"

let url = "https://wa.me/" + telefono + "?text=" + encodeURIComponent(texto)

window.location.href = url

}
