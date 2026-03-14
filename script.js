let picks={}
let precio=10
let total=0
let quinelas=[]
let dobles=0
let triples=0

function pick(partido,valor,btn){

if(!picks[partido]) picks[partido]=[]

if(picks[partido].includes(valor)){

picks[partido]=picks[partido].filter(v=>v!==valor)
btn.classList.remove("activo")

}else{

picks[partido].push(valor)
btn.classList.add("activo")

}

contarExtras()

}

function contarExtras(){

dobles=0
triples=0

for(let p in picks){

if(picks[p].length==2) dobles++
if(picks[p].length==3) triples++

}

document.getElementById("dobles").innerText=dobles
document.getElementById("triples").innerText=triples

}

function limpiar(){

picks={}

document.querySelectorAll("button").forEach(b=>b.classList.remove("activo"))

dobles=0
triples=0

document.getElementById("dobles").innerText=0
document.getElementById("triples").innerText=0

}

function aleatorio(){

document.querySelectorAll("tr").forEach((fila,i)=>{

if(i==0)return

let botones=fila.querySelectorAll("button")

let r=Math.floor(Math.random()*3)

botones[r].click()

})

}

function agregar(){

quinelas.push({...picks})

total+=precio

document.getElementById("total").innerText=total

limpiar()

}

function enviar(){

let nombre=document.getElementById("nombre").value

let texto="QUINIELAS MÉXICO\n\n"

texto+="Participante: "+nombre+"\n\n"

quinelas.forEach((q,i)=>{

texto+="Quiniela "+(i+1)+"\n"

for(let p in q){

texto+="Partido "+p+" : "+q[p].join("/")+"\n"

}

texto+="\n"

})

texto+="Dobles: "+dobles+"\n"
texto+="Triples: "+triples+"\n"

texto+="\nTotal: $"+total

let url="https://wa.me/524531467407?text="+encodeURIComponent(texto)

window.open(url)

}
