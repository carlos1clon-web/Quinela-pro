let precio = 10
let total = 0
let quinelas = []

function limpiar(){

document.querySelectorAll("input[type=checkbox]").forEach(c=>{
c.checked=false
})

}

function aleatorio(){

limpiar()

for(let i=1;i<=9;i++){

let opciones=document.querySelectorAll(`input[data-partido="${i}"]`)

let r=Math.floor(Math.random()*3)

opciones[r].checked=true

}

}

function agregar(){

let nombre=document.getElementById("nombre").value.trim()

if(nombre===""){
alert("Escribe tu nombre primero")
return
}

let seleccion=[]

for(let i=1;i<=9;i++){

let checks=document.querySelectorAll(`input[data-partido="${i}"]`)

let letra="-"

checks.forEach((c,index)=>{

if(c.checked){

if(index===0) letra="L"
if(index===1) letra="E"
if(index===2) letra="V"

}

})

seleccion.push(letra)

}

if(seleccion.every(v=>v==="-" )){
alert("Selecciona una quiniela")
return
}

quinelas.push(seleccion)

total+=precio

document.getElementById("total").innerText="$"+total

mostrarQuinielas()

limpiar()

}

function mostrarQuinielas(){

let contenedor=document.getElementById("listaQuinielas")

contenedor.innerHTML=""

quinelas.forEach((q,i)=>{

let div=document.createElement("div")

div.className="quinielaGuardada"

div.innerHTML=`
<span>${q.join(" ")}</span>
<button onclick="eliminarQuiniela(${i})">❌</button>
`

contenedor.appendChild(div)

})

}

function eliminarQuiniela(i){

quinelas.splice(i,1)

total-=precio

document.getElementById("total").innerText="$"+total

mostrarQuinielas()

}

function enviar(){

let nombre=document.getElementById("nombre").value

let texto="QUINIELAS MÉXICO\n\n"

texto+="Participante: "+nombre+"\n\n"

quinelas.forEach((q,i)=>{

texto+="Quiniela "+(i+1)+"\n"

q.forEach((p,j)=>{
texto+="Partido "+(j+1)+" : "+p+"\n"
})

texto+="\n"

})

texto+="Total: $"+total

let url="https://wa.me/5215610791509?text="+encodeURIComponent(texto)

window.open(url)

}
