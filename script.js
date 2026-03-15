let quinelas = []
let precio = 10
let totalGuardado = 0

document.addEventListener("change",function(e){

if(e.target.type==="checkbox"){
calcularTotal()
}

})

function calcularTotal(){

let partidos={}

document.querySelectorAll("input[type=checkbox]").forEach(c=>{

let p=c.dataset.partido

if(!partidos[p]){
partidos[p]=0
}

if(c.checked){
partidos[p]++
}

})

let combinaciones=1

for(let p in partidos){

let sel=partidos[p]

if(sel===0){
sel=1
}

combinaciones*=sel

}

let totalActual=combinaciones*precio

document.getElementById("total").innerText="$"+(totalGuardado+totalActual)

}

function limpiar(){

document.querySelectorAll("input[type=checkbox]").forEach(c=>{
c.checked=false
})

calcularTotal()

}

function aleatorio(){

limpiar()

for(let i=1;i<=9;i++){

let checks=document.querySelectorAll(`input[data-partido="${i}"]`)

let r=Math.floor(Math.random()*3)

checks[r].checked=true

}

calcularTotal()

}

function agregarQuiniela(){

let nombre=document.getElementById("nombre").value.trim()

if(nombre===""){
alert("Debes escribir tu nombre")
return
}

let seleccion=[]

for(let i=1;i<=9;i++){

let letra="-"

document.querySelectorAll(`input[data-partido="${i}"]`).forEach((c,index)=>{

if(c.checked){

if(index===0) letra="L"
if(index===1) letra="E"
if(index===2) letra="V"

}

})

seleccion.push(letra)

}

if(seleccion.every(v=>v==="-" )){
alert("Debes llenar la quiniela")
return
}

quinelas.push(seleccion)

totalGuardado+=precio

mostrarQuinielas()

limpiar()

}

function mostrarQuinielas(){

let contenedor=document.getElementById("listaQuinielas")

contenedor.innerHTML=""

quinelas.forEach((q,i)=>{

let div=document.createElement("div")

div.className="quinielaGuardada"

let texto=q.join(" ")

div.innerHTML=`
<span>${texto}</span>
<button onclick="eliminar(${i})">❌</button>
`

contenedor.appendChild(div)

})

}

function eliminar(i){

quinelas.splice(i,1)

totalGuardado-=precio

if(totalGuardado<0){
totalGuardado=0
}

mostrarQuinielas()

calcularTotal()

}

function enviar(){

let nombre=document.getElementById("nombre").value

if(nombre===""){
alert("Escribe tu nombre")
return
}

if(quinelas.length===0){
alert("No hay quinielas agregadas")
return
}

let texto="QUINIELAS LIGA MX\n\n"

texto+="Participante: "+nombre+"\n\n"

quinelas.forEach((q,i)=>{

texto+="Quiniela "+(i+1)+"\n"

q.forEach((p,j)=>{
texto+="Partido "+(j+1)+": "+p+"\n"
})

texto+="\n"

})

texto+="Total: $"+totalGuardado

let url="https://wa.me/5215610791509?text="+encodeURIComponent(texto)

window.open(url)

}
